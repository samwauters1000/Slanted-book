import FinderApp from "@/components/FinderApp";
import bookData from "@/data/content.json";
import type { BookData } from "@/lib/types";

export default function Home() {
  return <FinderApp data={bookData as BookData} />;
}
