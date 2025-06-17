import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import RuleClientPage from './client-page';

export const revalidate = 300;

export default async function RulePage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  const data = await client.queries.rule({
    relativePath: `${filepath}.mdx`,  
  });

  return (
    <Layout rawPageData={data}>
      <RuleClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let rules = await client.queries.ruleConnection();
  const allRules = rules;

  if (!allRules.data.ruleConnection.edges) {
    return [];
  }

  while (rules.data?.ruleConnection.pageInfo.hasNextPage) {
    rules = await client.queries.ruleConnection({
      after: rules.data.ruleConnection.pageInfo.endCursor,
    });

    if (!rules.data.ruleConnection.edges) {
      break;
    }

    allRules.data.ruleConnection.edges.push(...rules.data.ruleConnection.edges);
  }

  const params =
    allRules.data?.ruleConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
