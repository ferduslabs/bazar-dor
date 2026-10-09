import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return [
    { slug: "1" },
    { slug: "2" },
    { slug: "3" },
    { slug: "4" },
    { slug: "5" },
    { slug: "6" },
    { slug: "7" },
    { slug: "8" },
    { slug: "9" },
    { slug: "10" },
    { slug: "11" },
    { slug: "12" },
    { slug: "13" },
    { slug: "14" },
    { slug: "15" },
    { slug: "16" },
    { slug: "17" },
    { slug: "18" },
    { slug: "19" },
    { slug: "20" },
  ];
}

export const dynamicParams = false;

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  return <ProductClient slug={params.slug} />;
}
