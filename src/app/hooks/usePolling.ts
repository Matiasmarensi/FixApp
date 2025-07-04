/* import {  useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(ms: number = 6000, searchParams: string | null) {
  const router = useRouter();
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("usePolling");
      if (!searchParams) console.log("No searchParams");
      router.refresh();
    }, ms);
    return () => clearInterval(intervalId);
  }, [ms, searchParams]);
}
 */
