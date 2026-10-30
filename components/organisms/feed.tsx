import { PostList } from '@/components/organisms/post-list';
import { Feed as FeedName, useGetFeed } from '@/hooks/use-feeds';
import { PaginationParams } from '@/services/api-types';

type FeedProps = {
  feed: FeedName;
  params?: Omit<PaginationParams, 'cursor'>;
};

export function Feed({ feed, params }: Readonly<FeedProps>) {
  const query = useGetFeed(feed, params);

  return <PostList query={query} />;
}
