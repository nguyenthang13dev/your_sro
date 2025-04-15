"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import EditorComponent from "./Editor";
import withAuthorization from "@/libs/authentication";

const QLPages_Content = () => {
    const searchParams = useSearchParams();
    const idPage = searchParams.get("idPage") || "";

    return <EditorComponent idPage={idPage} />;
};

export default withAuthorization(QLPages_Content, "");
