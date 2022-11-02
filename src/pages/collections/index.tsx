import type { Collection } from "@prisma/client";
import prisma from "../../../lib/prisma";

import { GetServerSideProps } from "next";
import CollectionsList from "../../components/CollectionsList";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const collections: Collection[] = await prisma.collection.findMany();
  return { props: { initialCollections: collections } };
};

const Collections = ({ initialCollections }) => {
  const [collections, setCollections] =
    useState<Collection[]>(initialCollections);
  console.log(collections);
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
      <CollectionsList collections={collections} />
    </>
  );
};

export default Collections;
