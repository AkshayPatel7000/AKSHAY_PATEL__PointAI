export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  SelfieSelection: undefined;
  Camera: { imageUri: string };
  UploadProgress: { imageUri: string };
  MainApp: undefined;
};

// Actual API response shape (from live API)
export type SKUItem = {
  SKUID: string; // e.g. "ITEM0002ZX44"
  Gender: string; // e.g. "0"
  Cat: number; // e.g. 0
};

// Actual API response key is "MappedSkuList" (lowercase 'k')
export type APIResponse = {
  MappedSkuList: SKUItem[];
};

// Used for UI category tabs
export type CategoryType = 'All' | 'Dresses' | 'Tops' | 'Pants' | 'Jeans';
