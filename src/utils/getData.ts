export const getData = async (slug: string, body?: string) => {
  const res = await fetch(`http://localhost:3000/api/${slug}`, {
    next: {
      revalidate: 10,
    },
    body,
  }).then((res) => res);

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};
