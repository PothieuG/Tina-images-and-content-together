import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import RulesClientPage from './client-page';

export const revalidate = 300;

export default async function PostsPage() {
  let posts = await client.queries.ruleConnection({
    sort: 'date',
    last: 1
  });
  const allPosts = posts;

  if (!allPosts.data.ruleConnection.edges) {
    return [];
  }

  while (posts.data?.ruleConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.ruleConnection({
      sort: 'date',
      before: posts.data.ruleConnection.pageInfo.endCursor,
    });

    if (!posts.data.ruleConnection.edges) {
      break;
    }

    allPosts.data.ruleConnection.edges.push(...posts.data.ruleConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allPosts.data}>
      <RulesClientPage {...allPosts} />
    </Layout>
  );
}
