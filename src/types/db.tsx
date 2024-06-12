type Park = {
  _id: string;
  name: string;
  story: string;
  rates: [
    {
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

export type { Park };
