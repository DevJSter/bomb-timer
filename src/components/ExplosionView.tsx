"use client";
import React from "react";
import Image from "next/image";

interface ExplosionViewProps {}

export default function ExplosionView({}: ExplosionViewProps) {
  return (
    <div className="fixed inset-0 bg-black">
      <Image
        src="/assets/explosion2.gif"
        alt="explosion"
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}