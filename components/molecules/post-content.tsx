import { Text } from '@/components/atoms/text';
import { ProfileLink } from '@/components/molecules/profile-link';
import { Mention } from '@/services/api-types';
import type { ReactNode } from 'react';

type PostContentProps = {
  content: string;
  mentions: Mention[];
};

export function PostContent({ content, mentions }: Readonly<PostContentProps>) {
  const profilesByUsername = new Map(
    mentions.map(({ usernameAtMention, mentionedProfile }) => [
      usernameAtMention,
      mentionedProfile,
    ]),
  );
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of content.matchAll(/(^|[^\w@])@(\w+)/g)) {
    const profile = profilesByUsername.get(match[2]);
    if (!profile) {
      continue;
    }

    const start = match.index + match[1].length;
    const end = match.index + match[0].length;
    parts.push(
      content.slice(cursor, start),
      <ProfileLink
        key={start}
        profile={profile}
        accessibilityLabel={`View profile of ${profile.username}`}
        variant="body"
        colorName="accent"
        inline
      >
        {content.slice(start, end)}
      </ProfileLink>,
    );
    cursor = end;
  }

  parts.push(content.slice(cursor));

  return <Text variant="body">{parts}</Text>;
}
