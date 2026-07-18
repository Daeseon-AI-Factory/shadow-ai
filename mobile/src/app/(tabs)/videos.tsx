import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, clipsApi, libraryApi, type ClipResponse, type LibraryVideoResponse } from '@shadow-ai/core';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { SkeletonCards } from '@/components/skeleton';
import { pressableRipple, pressableStyle, useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/lib/auth-store';
import { t } from '@/lib/i18n';

type LibrarySection = 'videos' | 'clips';
const ALERT_REOPEN_DELAY_MS = 350;
type RemoveAttempt = { videoId: string; focusGeneration: number };

function ms(msVal: number) {
  const s = Math.round(msVal / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function VideosScreen() {
  const token = useAuthStore((s) => s.token);
  const theme = useTheme();
  const qc = useQueryClient();
  const [section, setSection] = useState<LibrarySection>('videos');
  const [clipQuery, setClipQuery] = useState('');
  const [feedbackPending, setFeedbackPending] = useState(false);
  const removingRef = useRef(false);
  const feedbackActiveRef = useRef(false);
  const focusGenerationRef = useRef(0);
  const feedbackPendingRef = useRef(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videos = useQuery({
    queryKey: ['library', 'videos'],
    queryFn: () => libraryApi.list({ page: 0, size: 50 }),
    enabled: !!token,
  });
  const clips = useQuery({
    queryKey: ['clips', 'library-tab', clipQuery],
    queryFn: () =>
      clipsApi.list({ page: 0, size: 50, sort: 'newest', q: clipQuery.trim() || undefined }),
    enabled: !!token && section === 'clips',
  });

  useFocusEffect(
    useCallback(() => {
      focusGenerationRef.current += 1;
      feedbackActiveRef.current = true;
      feedbackPendingRef.current = false;
      setFeedbackPending(false);
      return () => {
        feedbackActiveRef.current = false;
        focusGenerationRef.current += 1;
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
        feedbackTimerRef.current = null;
        feedbackPendingRef.current = false;
      };
    }, []),
  );

  const releaseRemoveFeedback = () => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = null;
    feedbackPendingRef.current = false;
    if (feedbackActiveRef.current) setFeedbackPending(false);
  };

  const queueRemoveFeedback = (variables: RemoveAttempt) => {
    if (
      !feedbackActiveRef.current ||
      variables.focusGeneration !== focusGenerationRef.current
    ) return;
    feedbackPendingRef.current = true;
    setFeedbackPending(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    const feedbackTimer = setTimeout(() => {
      if (feedbackTimerRef.current !== feedbackTimer) return;
      feedbackTimerRef.current = null;
      if (
        !feedbackActiveRef.current ||
        variables.focusGeneration !== focusGenerationRef.current
      ) return;
      Alert.alert(
        t('feedback.videoDeleteFailedTitle'),
        t('feedback.videoDeleteFailedMessage'),
        [
          { text: t('common.cancel'), style: 'cancel', onPress: releaseRemoveFeedback },
          {
            text: t('common.retry'),
            onPress: () => {
              releaseRemoveFeedback();
              if (!feedbackActiveRef.current) return;
              submitRemove(variables);
            },
          },
        ],
        { cancelable: true, onDismiss: releaseRemoveFeedback },
      );
    }, ALERT_REOPEN_DELAY_MS);
    feedbackTimerRef.current = feedbackTimer;
  };

  const remove = useMutation({
    mutationFn: ({ videoId }: RemoveAttempt) => libraryApi.remove(videoId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['library', 'videos'] }),
    onError: (error, variables) => {
      if (error instanceof ApiError && error.status === 401) return;
      queueRemoveFeedback(variables);
    },
    onSettled: () => {
      removingRef.current = false;
    },
  });

  const submitRemove = (variables: RemoveAttempt) => {
    if (
      !feedbackActiveRef.current ||
      variables.focusGeneration !== focusGenerationRef.current ||
      removingRef.current ||
      feedbackPendingRef.current
    ) return;
    removingRef.current = true;
    remove.mutate(variables);
  };

  const confirmRemove = (item: LibraryVideoResponse) => {
    Alert.alert(t('videos.removeTitle'), item.video.title, [
      { text: t('library.cancel'), style: 'cancel' },
      {
        text: t('library.delete'),
        style: 'destructive',
        onPress: () => submitRemove({
          videoId: item.video.id,
          focusGeneration: focusGenerationRef.current,
        }),
      },
    ]);
  };

  if (!token) return <Redirect href="/login" />;

  const videoItems = videos.data?.items ?? [];
  const clipItems = clips.data?.items ?? [];

  return (
    <ThemedView style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <View style={styles.header}>
          <Pressable
            style={pressableStyle([styles.importBtn, { backgroundColor: theme.primary }])}
            android_ripple={pressableRipple}
            onPress={() => router.push('/import')}
            accessibilityRole="button"
            accessibilityLabel={t('videos.import')}
          >
            <ThemedText style={[styles.importText, { color: theme.onPrimary }]}>
              ＋ {t('videos.import')}
            </ThemedText>
          </Pressable>
          <View style={[styles.segment, { borderColor: theme.border }]}>
            <SegmentButton
              label={t('library.videosTab')}
              active={section === 'videos'}
              onPress={() => setSection('videos')}
            />
            <SegmentButton
              label={t('library.clipsTab')}
              active={section === 'clips'}
              onPress={() => setSection('clips')}
            />
          </View>
        </View>

        {section === 'clips' ? (
          <ClipsPane
            clips={clipItems}
            query={clipQuery}
            setQuery={setClipQuery}
            isPending={clips.isPending}
            isFetching={clips.isFetching}
            isError={clips.isError}
            error={clips.error}
            onRefresh={() => clips.refetch()}
          />
        ) : videos.isPending ? (
          <SkeletonCards />
        ) : videos.isError ? (
          <ErrorState message={(videos.error as Error).message} onRetry={() => videos.refetch()} />
        ) : (
          <FlatList
            data={videoItems}
            keyExtractor={(it) => it.video.id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={videos.isFetching} onRefresh={() => videos.refetch()} />
            }
            renderItem={({ item }) => (
              <Pressable
                style={pressableStyle([
                  styles.card,
                  { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                ])}
                android_ripple={pressableRipple}
                disabled={remove.isPending || feedbackPending}
                onPress={() => router.push(`/video/${item.video.id}`)}
                onLongPress={() => confirmRemove(item)}
                accessibilityRole="button"
                accessibilityLabel={item.video.title}
              >
                {item.video.thumbnailUrl ? (
                  <Image source={{ uri: item.video.thumbnailUrl }} style={styles.thumb} />
                ) : (
                  <View style={[styles.thumb, { backgroundColor: theme.backgroundSelected }]} />
                )}
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold" numberOfLines={2}>
                    {item.video.title}
                  </ThemedText>
                  {item.video.channelName ? (
                    <ThemedText type="small" numberOfLines={1} style={{ color: theme.textSecondary }}>
                      {item.video.channelName}
                    </ThemedText>
                  ) : null}
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {t('videos.clipCount', { count: item.clipCount })}
                  </ThemedText>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <EmptyState
                icon={{ ios: 'play.rectangle.on.rectangle', android: 'video_library', web: 'video_library' }}
                title={t('videos.emptyTitle')}
                body={t('videos.emptyBody')}
                primary={{ label: t('videos.import'), onPress: () => router.push('/import') }}
                secondary={{ label: t('videos.emptyDiscover'), onPress: () => router.push('/discover') }}
              />
            }
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

function SegmentButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      style={pressableStyle([
        styles.segmentItem,
        active && { backgroundColor: theme.primary },
      ])}
      android_ripple={pressableRipple}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      <ThemedText
        style={[
          styles.segmentText,
          { color: active ? theme.onPrimary : theme.textSecondary },
        ]}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

function ClipsPane({
  clips,
  query,
  setQuery,
  isPending,
  isFetching,
  isError,
  error,
  onRefresh,
}: {
  clips: ClipResponse[];
  query: string;
  setQuery: (value: string) => void;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  onRefresh: () => void;
}) {
  const theme = useTheme();

  if (isPending) return <SkeletonCards />;
  if (isError) return <ErrorState message={(error as Error).message} onRetry={onRefresh} />;

  return (
    <>
      <TextInput
        style={[
          styles.search,
          {
            color: theme.text,
            backgroundColor: theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}
        placeholder={t('library.searchPlaceholder')}
        placeholderTextColor={theme.textSecondary}
        selectionColor={theme.primary}
        autoCapitalize="none"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />
      <FlatList
        data={clips}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
        ListEmptyComponent={
          query ? (
            <ThemedText type="small" style={styles.empty}>
              {t('library.emptySearch')}
            </ThemedText>
          ) : (
            <EmptyState
              icon={{ ios: 'scissors', android: 'content_cut', web: 'content_cut' }}
              title={t('library.emptyClipsTitle')}
              body={t('library.emptyClipsBody')}
              primary={{ label: t('videos.import'), onPress: () => router.push('/import') }}
              secondary={{ label: t('videos.emptyDiscover'), onPress: () => router.push('/discover') }}
            />
          )
        }
        renderItem={({ item }) => <ClipRow item={item} />}
      />
    </>
  );
}

function ClipRow({ item }: { item: ClipResponse }) {
  const theme = useTheme();

  return (
    <Pressable
      style={pressableStyle([
        styles.clipCard,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ])}
      android_ripple={pressableRipple}
      onPress={() => router.push(`/player/${item.id}`)}
      accessibilityRole="button"
      accessibilityLabel={item.name || item.videoTitle}
    >
      <View style={styles.clipTop}>
        <ThemedText type="smallBold" numberOfLines={1} style={styles.flex}>
          {item.name || item.videoTitle}
        </ThemedText>
        <ThemedText type="small">
          {ms(item.startMs)}-{ms(item.endMs)}
        </ThemedText>
      </View>
      {item.transcript ? (
        <ThemedText type="small" numberOfLines={2}>
          {item.transcript}
        </ThemedText>
      ) : (
        <ThemedText type="small" style={{ color: theme.textSecondary }} numberOfLines={1}>
          {item.videoTitle}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mt: { marginTop: 24 },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, gap: 12 },
  importBtn: {
    borderRadius: 10,
    minHeight: 48,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importText: { fontWeight: '700' },
  segment: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  segmentItem: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  segmentText: { fontWeight: '800' },
  search: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 88,
    padding: 10,
    alignItems: 'center',
  },
  thumb: { width: 120, height: 68, borderRadius: 8 },
  cardBody: { flex: 1, gap: 3 },
  empty: { textAlign: 'center', marginTop: 40, paddingHorizontal: 24 },
  clipCard: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 72,
    padding: 14,
    gap: 6,
    justifyContent: 'center',
  },
  clipTop: { flexDirection: 'row', gap: 8, alignItems: 'center' },
});
