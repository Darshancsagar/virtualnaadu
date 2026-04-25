// JSON-LD Schema utilities for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Virtual Naadu",
  description:
    "Virtual Naadu - Explore the hidden gems, waterfalls, temples, and scenic spots of Malenadu region in Karnataka.",
  url: "https://www.virtualnaadu.com",
  logo: "https://www.virtualnaadu.com/logo.png",
  email: "everyinformation11@gmail.com",
  areaServed: {
    "@type": "place",
    name: "Malenadu, Karnataka, India",
  },
  sameAs: [
    "https://www.facebook.com/virtualnaadu",
    "https://www.instagram.com/virtualnaadu",
    "https://www.twitter.com/virtualnaadu",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Virtual Naadu",
  description:
    "Tourism information and travel guides for Malenadu region with 13+ tourist destinations including waterfalls, hill stations, temples, and trekking spots.",
  image: "https://www.virtualnaadu.com/images/malenadu-tourism.jpg",
  url: "https://www.virtualnaadu.com",
  telephone: "+91-XXXXXXXXXX",
  email: "everyinformation11@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Malenadu Region",
    addressLocality: "Karnataka",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.9299",
    longitude: "75.5355",
  },
  areaServed: "Malenadu, Karnataka, India",
  priceRange: "Free",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const placeSchema = (place: {
  name: string;
  description: string;
  image: string;
  location: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  name: place.name,
  description: place.description,
  image: place.image,
  address: {
    "@type": "PostalAddress",
    addressLocality: place.location,
    addressCountry: "IN",
  },
  url: place.url,
  areaServed: "Malenadu, Karnataka, India",
});

export const touristAttractionSchema = (place: {
  name: string;
  description: string;
  image: string;
  location: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: place.name,
  description: place.description,
  image: place.image,
  address: {
    "@type": "PostalAddress",
    addressLocality: place.location,
    addressCountry: "IN",
  },
  url: place.url,
  areaServed: "Malenadu, Karnataka, India",
});

export const articleSchema = (article: {
  headline: string;
  description: string;
  image: string;
  dateModified: string;
  author: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.headline,
  description: article.description,
  image: article.image,
  dateModified: article.dateModified,
  author: {
    "@type": "Organization",
    name: article.author,
  },
  url: article.url,
  publisher: {
    "@type": "Organization",
    name: "Virtual Naadu",
    logo: {
      "@type": "ImageObject",
      url: "https://www.virtualnaadu.com/logo.png",
    },
  },
});

export const collectionPageSchema = (collection: {
  name: string;
  description: string;
  url: string;
  image: string;
  numberOfItems: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: collection.name,
  description: collection.description,
  url: collection.url,
  image: collection.image,
  mainEntity: {
    "@type": "Collection",
    name: collection.name,
    numberOfItems: collection.numberOfItems,
  },
});
