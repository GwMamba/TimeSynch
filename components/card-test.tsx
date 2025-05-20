"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CardTest() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a test card</p>
      </CardContent>
    </Card>
  );
}