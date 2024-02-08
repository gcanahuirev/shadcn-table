import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/people">People</Link>
      </Button>
      <Button asChild>
        <Link href="/registry">Registry</Link>
      </Button>
    </div>
  );
}
