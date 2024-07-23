"use client";

import { RsSearch } from "@/components/fragment/request/RsComboBox";
import { Button } from "@/components/ui/button";

const NewRequestPage = () => {
  // return <div className="p-10">{isLoaded && <RsSearch />}
  return (
    <div className="h-screen flex justify-center items-center">
      <RsSearch />
    </div>
  );
};

export default NewRequestPage;
