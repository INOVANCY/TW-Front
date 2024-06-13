type UserPayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  profilePicture: string | null;
  iat: number; // Timestamp d'émission
  exp: number; // Timestamp d'expiration
};

type Park = {
  _id: string;
  name: string;
  story: string;
  rates: [
    {
      _id: string;
      year: number;
      adultPrice: number;
      childPrice: number;
      specialPrice: number;
      isEntranceFree: boolean;
      offersDiscounts: boolean;
      offersEarlyBird: boolean;
    }
  ];
  localisation: [number, number];
  medias: [{ url: string; type: string }];
  lands: [
    {
      _id: string;
      name: string;
    }
  ];

  createdAt: Date;
  updatedAt: Date;
};

export type { UserPayload, Park };
