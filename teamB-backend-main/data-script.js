const initialData = {
  admin: {
    email: 'admin3@charitan.com',
    password: 'adminpassword',
  },
  charities: [
    { type: 'Person', country: 'Vietnam', companyName: 'Individual VN', category: [Humanitarian], region: ['Asia'], avatar: "indi_vn.jpg" },
    { type: 'Person', country: 'USA', companyName: 'Individual USA', category: [Education], region: ['Americas'], avatar: "indi_usa.jpg" },
    { type: 'Company', country: 'South Africa', companyName: 'Company SA', category: [Housing], region: ['Africa'], avatar: "com_sa.jpg" },
    { type: 'Company', country: 'Germany', companyName: 'Company DE', category: [Health], region: ['Europe'], avatar: "com_de.jpg" },
    { type: 'Non-profit Organization', country: 'Ukraine', companyName: 'Non-profit UA', category: [Religion], region: ['Europe'], avatar: "org_ua.jpg" },
    { type: 'Non-profit Organization', country: 'Israel', companyName: 'Non-profit IL', category: [Food], region: ['Asia'], avatar: "org_il.jpg" },
  ],
  donor: [
    {
      "userId": "6780e3258f09518b69a9a672",
      "firstName": "Nguyen",
      "lastName": "Van Hoang",
      "address": ["Hanoi, Vietnam"],
      "region": ["Asia", "Vietnam"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Asia", "Vietnam"]
      },
      "donationStat": {
        "totalDonation": 1300,
        "monthlyDonated": 150,
        "projectsDonated": 4
      },
      "stripeId": "stripe001"
    },
    {
      "userId": "6780e3258f09518b69a9a673",
      "firstName": "Tran",
      "lastName": "Thi Mai",
      "address": ["Ho Chi Minh City, Vietnam"],
      "region": ["Asia", "Vietnam"],
      "subscription": {
        "category": ["Education"],
        "region": ["Asia", "Vietnam"]
      },
      "donationStat": {
        "totalDonation": 2000,
        "monthlyDonated": 250,
        "projectsDonated": 6
      },
      "stripeId": "stripe002"
    },
    {
      "userId": "6780e3258f09518b69a9a674",
      "firstName": "Pham",
      "lastName": "Duc Thang",
      "address": ["Da Nang, Vietnam"],
      "region": ["Asia", "Vietnam"],
      "subscription": {
        "category": ["Health"],
        "region": ["Asia", "Vietnam"]
      },
      "donationStat": {
        "totalDonation": 900,
        "monthlyDonated": 100,
        "projectsDonated": 3
      },
      "stripeId": "stripe003"
    },
    {
      "userId": "6780e3258f09518b69a9a675",
      "firstName": "Le",
      "lastName": "Minh Quan",
      "address": ["Hue, Vietnam"],
      "region": ["Asia", "Vietnam"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Asia", "Vietnam"]
      },
      "donationStat": {
        "totalDonation": 1700,
        "monthlyDonated": 220,
        "projectsDonated": 5
      },
      "stripeId": "stripe004"
    },
    {
      "userId": "6780e3258f09518b69a9a676",
      "firstName": "Hoang",
      "lastName": "Thi Ngoc",
      "address": ["Can Tho, Vietnam"],
      "region": ["Asia", "Vietnam"],
      "subscription": {
        "category": ["Education"],
        "region": ["Asia", "Vietnam"]
      },
      "donationStat": {
        "totalDonation": 1500,
        "monthlyDonated": 180,
        "projectsDonated": 4
      },
      "stripeId": "stripe005"
    },
    {
      "userId": "6780e3258f09518b69a9a677",
      "firstName": "Hans",
      "lastName": "Müller",
      "address": ["Berlin, Germany"],
      "region": ["Europe", "Germany"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Europe", "Germany"]
      },
      "donationStat": {
        "totalDonation": 1800,
        "monthlyDonated": 200,
        "projectsDonated": 6
      },
      "stripeId": "stripe101"
    },
    {
      "userId": "6780e3258f09518b69a9a678",
      "firstName": "Anna",
      "lastName": "Schmidt",
      "address": ["Munich, Germany"],
      "region": ["Europe", "Germany"],
      "subscription": {
        "category": ["Education"],
        "region": ["Europe", "Germany"]
      },
      "donationStat": {
        "totalDonation": 2500,
        "monthlyDonated": 300,
        "projectsDonated": 8
      },
      "stripeId": "stripe102"
    },
    {
      "userId": "6780e3258f09518b69a9a679",
      "firstName": "Peter",
      "lastName": "Krause",
      "address": ["Frankfurt, Germany"],
      "region": ["Europe", "Germany"],
      "subscription": {
        "category": ["Health"],
        "region": ["Europe", "Germany"]
      },
      "donationStat": {
        "totalDonation": 1200,
        "monthlyDonated": 150,
        "projectsDonated": 4
      },
      "stripeId": "stripe103"
    },
    {
      "userId": "6780e3258f09518b69a9a680",
      "firstName": "Lisa",
      "lastName": "Weber",
      "address": ["Hamburg, Germany"],
      "region": ["Europe", "Germany"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Europe", "Germany"]
      },
      "donationStat": {
        "totalDonation": 3000,
        "monthlyDonated": 350,
        "projectsDonated": 10
      },
      "stripeId": "stripe104"
    },
    {
      "userId": "6780e3258f09518b69a9a681",
      "firstName": "Michael",
      "lastName": "Fischer",
      "address": ["Cologne, Germany"],
      "region": ["Europe", "Germany"],
      "subscription": {
        "category": ["Education"],
        "region": ["Europe", "Germany"]
      },
      "donationStat": {
        "totalDonation": 1500,
        "monthlyDonated": 200,
        "projectsDonated": 5
      },
      "stripeId": "stripe105"
    },
    {
      "userId": "6780e3258f09518b69a9a682",
      "firstName": "Ali",
      "lastName": "Al-Thani",
      "address": ["Doha, Qatar"],
      "region": ["Asia", "Qatar"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Asia", "Qatar"]
      },
      "donationStat": {
        "totalDonation": 2000,
        "monthlyDonated": 250,
        "projectsDonated": 7
      },
      "stripeId": "stripe201"
    },
    {
      "userId": "6780e3258f09518b69a9a683",
      "firstName": "Fatima",
      "lastName": "Al-Kuwari",
      "address": ["Al Rayyan, Qatar"],
      "region": ["Asia", "Qatar"],
      "subscription": {
        "category": ["Education"],
        "region": ["Asia", "Qatar"]
      },
      "donationStat": {
        "totalDonation": 1500,
        "monthlyDonated": 200,
        "projectsDonated": 6
      },
      "stripeId": "stripe202"
    },
    {
      "userId": "6780e3258f09518b69a9a684",
      "firstName": "Hamad",
      "lastName": "Bin Khalid",
      "address": ["Doha, Qatar"],
      "region": ["Asia", "Qatar"],
      "subscription": {
        "category": ["Health"],
        "region": ["Asia", "Qatar"]
      },
      "donationStat": {
        "totalDonation": 1200,
        "monthlyDonated": 150,
        "projectsDonated": 5
      },
      "stripeId": "stripe203"
    },
    {
      "userId": "6780e3258f09518b69a9a685",
      "firstName": "Noora",
      "lastName": "Al-Sulaiti",
      "address": ["Umm Salal, Qatar"],
      "region": ["Asia", "Qatar"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Asia", "Qatar"]
      },
      "donationStat": {
        "totalDonation": 1800,
        "monthlyDonated": 220,
        "projectsDonated": 6
      },
      "stripeId": "stripe204"
    },
    {
      "userId": "6780e3258f09518b69a9a686",
      "firstName": "Salem",
      "lastName": "Al-Nuaimi",
      "address": ["Al Wakrah, Qatar"],
      "region": ["Asia", "Qatar"],
      "subscription": {
        "category": ["Education"],
        "region": ["Asia", "Qatar"]
      },
      "donationStat": {
        "totalDonation": 1400,
        "monthlyDonated": 180,
        "projectsDonated": 5
      },
      "stripeId": "stripe205"
    },
    {
      "userId": "6780e3258f09518b69a9a687",
      "firstName": "John",
      "lastName": "Smith",
      "address": ["New York, USA"],
      "region": ["North America", "USA"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["North America", "USA"]
      },
      "donationStat": {
        "totalDonation": 2500,
        "monthlyDonated": 300,
        "projectsDonated": 8
      },
      "stripeId": "stripe301"
    },
    {
      "userId": "6780e3258f09518b69a9a688",
      "firstName": "Emily",
      "lastName": "Johnson",
      "address": ["Los Angeles, USA"],
      "region": ["North America", "USA"],
      "subscription": {
        "category": ["Education"],
        "region": ["North America", "USA"]
      },
      "donationStat": {
        "totalDonation": 1800,
        "monthlyDonated": 200,
        "projectsDonated": 6
      },
      "stripeId": "stripe302"
    },
    {
      "userId": "6780e3258f09518b69a9a689",
      "firstName": "Michael",
      "lastName": "Brown",
      "address": ["Chicago, USA"],
      "region": ["North America", "USA"],
      "subscription": {
        "category": ["Health"],
        "region": ["North America", "USA"]
      },
      "donationStat": {
        "totalDonation": 1500,
        "monthlyDonated": 180,
        "projectsDonated": 5
      },
      "stripeId": "stripe303"
    },
    {
      "userId": "6780e3258f09518b69a9a690",
      "firstName": "Jessica",
      "lastName": "Davis",
      "address": ["Houston, USA"],
      "region": ["North America", "USA"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["North America", "USA"]
      },
      "donationStat": {
        "totalDonation": 2200,
        "monthlyDonated": 250,
        "projectsDonated": 7
      },
      "stripeId": "stripe304"
    },
    {
      "userId": "6780e3258f09518b69a9a691",
      "firstName": "Sarah",
      "lastName": "Miller",
      "address": ["San Francisco, USA"],
      "region": ["North America", "USA"],
      "subscription": {
        "category": ["Education"],
        "region": ["North America", "USA"]
      },
      "donationStat": {
        "totalDonation": 2000,
        "monthlyDonated": 220,
        "projectsDonated": 6
      },
      "stripeId": "stripe305"
    },
    {
      "userId": "6780e3258f09518b69a9a692",
      "firstName": "Jean",
      "lastName": "Mbala",
      "address": ["Yaoundé, Cameroon"],
      "region": ["Africa", "Cameroon"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Africa", "Cameroon"]
      },
      "donationStat": {
        "totalDonation": 1200,
        "monthlyDonated": 150,
        "projectsDonated": 5
      },
      "stripeId": "stripe401"
    },
    {
      "userId": "6780e3258f09518b69a9a693",
      "firstName": "Pauline",
      "lastName": "Ngono",
      "address": ["Douala, Cameroon"],
      "region": ["Africa", "Cameroon"],
      "subscription": {
        "category": ["Education"],
        "region": ["Africa", "Cameroon"]
      },
      "donationStat": {
        "totalDonation": 900,
        "monthlyDonated": 100,
        "projectsDonated": 4
      },
      "stripeId": "stripe402"
    },
    {
      "userId": "6780e3258f09518b69a9a694",
      "firstName": "Simon",
      "lastName": "Abega",
      "address": ["Garoua, Cameroon"],
      "region": ["Africa", "Cameroon"],
      "subscription": {
        "category": ["Health"],
        "region": ["Africa", "Cameroon"]
      },
      "donationStat": {
        "totalDonation": 1500,
        "monthlyDonated": 200,
        "projectsDonated": 6
      },
      "stripeId": "stripe403"
    },
    {
      "userId": "6780e3258f09518b69a9a695",
      "firstName": "Esther",
      "lastName": "Ewane",
      "address": ["Bamenda, Cameroon"],
      "region": ["Africa", "Cameroon"],
      "subscription": {
        "category": ["Health", "Education"],
        "region": ["Africa", "Cameroon"]
      },
      "donationStat": {
        "totalDonation": 2000,
        "monthlyDonated": 250,
        "projectsDonated": 7
      },
      "stripeId": "stripe404"
    },
    {
      "userId": "6780e3258f09518b69a9a696",
      "firstName": "Pierre",
      "lastName": "Nkongho",
      "address": ["Buea, Cameroon"],
      "region": ["Africa", "Cameroon"],
      "subscription": {
        "category": ["Education"],
        "region": ["Africa", "Cameroon"]
      },
      "donationStat": {
        "totalDonation": 1100,
        "monthlyDonated": 130,
        "projectsDonated": 5
      },
      "stripeId": "stripe405"
    }
  ],
  categories: ['Food', 'Health', 'Education', 'Environment', 'Religion', 'Humanitarian', 'Housing', 'Other'],
  regions: ([
    ['Africa', [
      'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
      'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros',
      'Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini',
      'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau',
      'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar',
      'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique',
      'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
      'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa',
      'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
    ]],
    ['Americas', [
      'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada',
      'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador',
      'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico',
      'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia',
      'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'USA',
      'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador',
      'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'
    ]],
    ['Asia', [
      'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan',
      'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia',
      'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait',
      'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia',
      'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine',
      'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea',
      'Sri Lanka', 'Syria', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey',
      'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'
    ]],
    ['Europe', [
      'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
      'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
      'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia',
      'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan',
      'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta',
      'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia',
      'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino',
      'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland',
      'Ukraine', 'United Kingdom', 'Vatican City'
    ]],
    ['Oceania', [
      'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru',
      'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands',
      'Tonga', 'Tuvalu', 'Vanuatu'
    ]],
    ['Antarctica', []],
    ['Global', []]
  ]),
  globalProjects: [
    {
      title: 'Middle East Crisis',
      description: 'Emergency medical support and shelter for displaced families in the Middle East.',
      duration: 9,
      goalAmount: 1500000,
      charityCompanyName: 'Non-profit IL',
      categories: ['Health', 'Religion'],
      region: 'Global',
      images: ["middleeast1.jpg", "middleeast2.jpg", "middleeast3.jpg"],
      videos: ["middleeast_video.mp4"],
    },
    {
      title: 'Ukraine - Russia War',
      description: 'Providing psychological counseling and education for war-affected children in Ukraine.',
      duration: 18,
      goalAmount: 3000000,
      charityCompanyName: 'Non-profit UA',
      categories: ['Education', 'Housing'],
      region: 'Global',
      images: ["ukraine1.jpg", "ukraine2.jpg"],
      videos: ["ukraine_video.mp4"],
    },
    {
      title: 'Food Program in South Africa (Lesotho, Malawi, Namibia, Zambia and Zimbabwe, Mozambique and Angola)',
      description: 'Building sustainable food systems for communities in Southern Africa.',
      duration: 6,
      goalAmount: 750000,
      charityCompanyName: 'Company SA',
      categories: ['Humanitarian', 'Food'],
      region: 'Global',
      images: ["africa_food1.jpg", "africa_food2.jpg", "africa_food3.jpg"],
      videos: ["africa_food_video.mp4"],
    },
  ],
  localProjects: [
    {
      title: 'Yagi Typhoon Support',
      description: 'Providing emergency relief, food supplies, and temporary shelters to Yagi Typhoon victims.',
      duration: 6,
      goalAmount: 500000,
      charityCompanyName: 'Individual VN',
      categories: ['Humanitarian', 'Disaster Relief'],
      region: 'Asia',
      country: 'Vietnam',
      images: ["yagi_typhoon1.jpg", "yagi_typhoon2.jpg"],
      videos: ["yagi_typhoon_video.mp4"],
    },
    {
      title: 'Milton Hurricane Support',
      description: 'Rebuilding homes and offering mental health support for Milton Hurricane survivors.',
      duration: 12,
      goalAmount: 1000000,
      charityCompanyName: 'Individual USA',
      categories: ['Humanitarian', 'Mental Health'],
      region: 'North America',
      country: 'USA',
      images: ["milton_hurricane1.jpg", "milton_hurricane2.jpg"],
      videos: ["milton_hurricane_video.mp4"],
    },
    {
      title: 'Helping Ukrainian Refugee',
      description: 'Providing essential services like education, housing, and medical aid for Ukrainian refugees in Germany.',
      duration: 18,
      goalAmount: 1200000,
      charityCompanyName: 'Company DE',
      categories: ['Humanitarian', 'Housing', 'Health'],
      region: 'Europe',
      country: 'Germany',
      images: ["ukrainian_refugees1.jpg", "ukrainian_refugees2.jpg"],
      videos: ["ukrainian_refugees_video.mp4"],
    },
    {
      title: "Supporting SOS Children's Village",
      description: "Expanding facilities and providing educational tools for children in SOS Children's Village.",
      duration: 24,
      goalAmount: 1500000,
      charityCompanyName: 'Company DE',
      categories: ['Education', 'Infrastructure'],
      region: 'Asia',
      country: 'China',
      images: ["sos_village1.jpg", "sos_village2.jpg"],
      videos: ["sos_village_video.mp4"],
    },
  ],
};

module.exports = initialData;
