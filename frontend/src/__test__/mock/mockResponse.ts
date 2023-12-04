import { nextPageData } from "./mockData";

export interface Response {
  statusCode: number;
  message: string[];
  data: unknown;
}

export const idResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: [
      {
        id: "TS0001",
        name: "山田 太郎",
        address: "東京都港区芝公園1-2-3",
        tel: "8012345678",
      },
    ],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=20",
    },
  },
};

export const nameResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: [
      {
        id: "TS0003",
        name: "鈴木 裕子",
        address: "京都府京都市左京区岡崎1-1-1",
        tel: "7055557777",
      },
      {
        id: "TS0019",
        name: "鈴木 千鶴",
        address: "富山県富山市新庄2-3-4",
        tel: "8044443333",
      },
      {
        id: "TS0038",
        name: "鈴木 真一",
        address: "福井県福井市大手3-4-5",
        tel: "9012340987",
      },
      {
        id: "TS0053",
        name: "鈴木 裕子",
        address: "東京都台東区浅草1-2-3",
        tel: "9011110000",
      },
      {
        id: "TS0069",
        name: "鈴木 千鶴",
        address: "山口県山口市美野島1-2-3",
        tel: "7098761234",
      },
      {
        id: "TS0088",
        name: "鈴木 真一",
        address: "佐賀県佐賀市城内1-2-3",
        tel: "8087654321",
      },
      {
        id: "TS0105",
        name: "鈴木 理子",
        address: "大阪府大阪市中央区難波1-4-5",
        tel: "08012345678",
      },
    ],
  },
  meta: {
    totalItems: 7,
    itemCount: 7,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
  },
  links: {
    first: "http://localhost:3001/search-member?limit=20",
    previous: "",
    next: "http://localhost:3001/search-member?page=2&limit=20",
    last: "http://localhost:3001/search-member?page=6&limit=20",
  },
};

export const addressResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: [
      {
        id: "TS0027",
        name: "加藤 太一",
        address: "石川県金沢市香枦町1-2-3",
        tel: "7077770000",
      },
      {
        id: "TS0043",
        name: "山田 里奈",
        address: "石川県金沢市角間町1-2-3",
        tel: "8044443333",
      },
    ],
  },
  meta: {
    totalItems: 2,
    itemCount: 2,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
  },
  links: {
    first: "http://localhost:3001/search-member?limit=20",
    previous: "",
    next: "http://localhost:3001/search-member?page=2&limit=20",
    last: "http://localhost:3001/search-member?page=6&limit=20",
  },
};

export const telResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: [
      {
        id: "TS0027",
        name: "加藤 太一",
        address: "石川県金沢市香枦町1-2-3",
        tel: "7077770000",
      },
    ],
  },
  meta: {
    totalItems: 1,
    itemCount: 1,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
  },
  links: {
    first: "http://localhost:3001/search-member?limit=20",
    previous: "",
    next: "http://localhost:3001/search-member?page=2&limit=20",
    last: "http://localhost:3001/search-member?page=6&limit=20",
  },
};

export const emptyResponse = {
  statusCode: 200,
  message: ["検索結果がありません"],
  data: {
    items: [],
  },
};

export const errorResponse = {
  statusCode: 400,
  message: ["検索処理でエラーが発生しました。"],
  data: {
    items: [],
  },
};

export const findAllResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: [
      {
        id: "TS0001",
        name: "山田 太郎",
        address: "東京都港区芝公園1-2-3",
        tel: "8012345678",
      },
      {
        id: "TS0002",
        name: "佐藤 由美",
        address: "大阪府大阪市中央区難波1-4-5",
        tel: "9098765432",
      },
      {
        id: "TS0003",
        name: "鈴木 裕子",
        address: "京都府京都市左京区岡崎1-1-1",
        tel: "7055557777",
      },
      {
        id: "TS0004",
        name: "田中 花子",
        address: "福岡県福岡市博多区博多1-2-3",
        tel: "8011112222",
      },
      {
        id: "TS0005",
        name: "伊藤 健太",
        address: "北海道札幌市中央区大通西1-5-6",
        tel: "9088887777",
      },
      {
        id: "TS0006",
        name: "渡辺 美香",
        address: "愛知県名古屋市中区栄2-3-4",
        tel: "7044443333",
      },
      {
        id: "TS0007",
        name: "加藤 雄一",
        address: "兵庫県神戸市中央区三宮5-6-7",
        tel: "8076543210",
      },
      {
        id: "TS0008",
        name: "斎藤 真理",
        address: "福島県福島市本町1-2-3",
        tel: "9023456789",
      },
      {
        id: "TS0009",
        name: "高橋 光",
        address: "宮城県仙台市青葉区青葉1-1-1",
        tel: "7098761234",
      },
      {
        id: "TS0010",
        name: "中村 明美",
        address: "長野県長野市南千歳2-3-4",
        tel: "8033334444",
      },
      {
        id: "TS0011",
        name: "小林 裕太",
        address: "広島県広島市南区松原2-3-4",
        tel: "9099998888",
      },
      {
        id: "TS0012",
        name: "田村 さゆり",
        address: "熊本県熊本市中央区城本町1-1-1",
        tel: "7065432109",
      },
      {
        id: "TS0013",
        name: "渡辺 涼太",
        address: "岐阜県岐阜市橋本1-2-3",
        tel: "8022221111",
      },
      {
        id: "TS0014",
        name: "松本 真奈",
        address: "沖縄県那覇市久茂地1-2-3",
        tel: "9012340987",
      },
      {
        id: "TS0015",
        name: "伊藤 龍太",
        address: "青森県青森市浜館1-2-3",
        tel: "7077770000",
      },
      {
        id: "TS0016",
        name: "山本 亜美",
        address: "岡山県岡山市北区本町1-2-3",
        tel: "8087654321",
      },
      {
        id: "TS0017",
        name: "佐藤 貴子",
        address: "新潟県新潟市中央区古町1-2-3",
        tel: "9011110000",
      },
      {
        id: "TS0018",
        name: "中島 雄介",
        address: "長崎県長崎市松島町1-2-3",
        tel: "7022223333",
      },
      {
        id: "TS0019",
        name: "鈴木 千鶴",
        address: "富山県富山市新庄2-3-4",
        tel: "8044443333",
      },
      {
        id: "TS0020",
        name: "田村 尚也",
        address: "奈良県奈良市登大路町1-2-3",
        tel: "9077778888",
      },
    ],
    meta: {
      totalItems: 106,
      itemCount: 20,
      itemsPerPage: 20,
      totalPages: 6,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const nextPageResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: nextPageData,
    meta: {
      totalItems: 2,
      itemCount: 2,
      itemsPerPage: 1,
      totalPages: 2,
      currentPage: 2,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=20",
    },
  },
};
