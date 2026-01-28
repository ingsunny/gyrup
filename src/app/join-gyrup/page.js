import { Suspense } from "react";
import JoinPage from "@/components/join-gyrup/JoinGyrup";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-gray-500">
          Loading...
        </div>
      }
    >
      <JoinPage />
    </Suspense>
  );
}
