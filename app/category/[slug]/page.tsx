import CategoryClient from "./CategoryClient";

export function generateStaticParams() {
  return [
    { slug: "chal" },
    { slug: "dal" },
    { slug: "sobji" },
    { slug: "macher-dor" },
    { slug: "murgi-dor" },
    { slug: "dim" },
    { slug: "tel" },
    { slug: "misti" },
    { slug: "chal-dal" },
  ];
}

export const dynamicParams = false;

interface Props {
  params: { slug: string };
}

export default function CategoryPage({ params }: Props) {
  return <CategoryClient slug={params.slug} />;
}
