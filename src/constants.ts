import { Book } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'A Arte da Guerra',
    author: 'Sun Tzu',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeRHY5uyk1mt6piSWS28GFiXAP4OOC2xzr5Qs5NwWDlWGQNX8jZCloNsYb9473eysxNaH53yAIvlZmdvjzSF5OdN7k43KA7fkLtGu28dCgpjLF4d3bMHXThgMt466qPz_2lvX5dtOeYTG6X7FHLiUW8lHDbYPRG6IoUUk9xU7va6KhDU8Tkohnb3WRtK_0EvuKlk94gHp9tb92JPN8uqCjvYQtV2SizEmuT9x2WCHRUQF4b6Z3v6AY-B3_x3t2CM2gI_zyG7T1',
    progress: 75,
    duration: '1h 15m'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk0PUXfBR2-AORqyqDgNk1uOdkt0xwi08i6tv9yQVooJPV7GDFx9XRBK8u76NUMOmUuDR8IPUSsU9PwH9ADIDtmQhaBlRHSnCJA0uYxT3DlNw2off5A5PAyr9hrdJMCvVWZlXw8NWCBn2jsBIVrCnWHq0GN9hBTuPpqn5BxkqAdaWhWvXd-S6ZBX5M-RZnOwJtCJjULqQc2NZUMc20TYfkSzVExrf41yOLAaoVSeMr_S8umKGYsEf0eQqi1GkSAK0uXFDr7HdQ',
    progress: 10,
    duration: '11h 22m'
  },
  {
    id: '3',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdObnSzgZz51ZoIxQVZH-uqh4bJP-BhdAaSz3anNwRii-GDmkuDBHjcDkm94KxmexXzmQZ0InJUbl3e2PHEOdkcNe1_5GZbPWJ_Qw_tPiheZw6ZN3sc8qUtmUVFYBPoSJR0tLGkSKSIDCWEHjMUkrf4TWG28y20FKG6xz8X4_zhWgSxJZGG1DbAEUdR-2G3rS5FJTGP0T7qxlUrbUXQdoEXb_93ZMI9mo5StxjC5-b2XuBiaMrGU2ylR0a8sHKK5wMPl7PT5C3',
    progress: 0,
    duration: '4h 30m'
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Kvi9jGBK5-Ap6cZ5kwbiFyNc8i7Dx1JFKWlocN3aCYnAglf0jjozd75LXK9idALg1Zf38Lc6QxcB-vcnGQmPcq-L0gR01EMcTUOfelji0VeGrx_d7OmuU3AkaxLiu_4pt8oxAvx_EVJpRWmpoJVLHgJmuSsNQbowb5RDnLQXumIDXgrYrEIhWEilkRjObN3DmMOpbgH87u3FnB6-ruwIpM8017hYherEw3p340jfAEhFgBomrkqlgVUYFv6bv9SvmFUYWJoU',
    progress: 100,
    duration: '15h 20m'
  },
  {
    id: '5',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIpfnTJd4Wo54Ma6AUv0HDwCOdmexbWKqeSYBApDe6PCalKegJNQDMecS0JCqVshhC6zrmvf3zrtzNIJhWD5VWZS28NmB8kM_FWa4qzZ8uNNr863OtQ3iH5qU33aAaglwyYjGloalMzKjdw4SsaQygOYUq8926lUzCwhxDGrY-E-HGNRhjmwut4jHpYnubMnGa-Nplr_rpNGzzPWewaDDh2nnkh8m_S4yog1ZUdETlBR3sXsWqwavfc-hqMQOpXUDMx0FUZeCJ',
    progress: 0,
    duration: '1h 40m'
  },
  {
    id: '6',
    title: 'Dom Quixote',
    author: 'Miguel de Cervantes',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8A4vROtPa0JMZpL17e2w9yb9S-Zc1FxRY0hNAorCdR2EzS43d_lk2D1KjxGXbobSivkJpqaa49gwPor0wX9IRgkLYZUgUBv6XgdGjOXWmzGDTc36H8VgomnGKQ3pvu3-ewm56vlzk5B4VVzg3dXDd-dcsdVFpu9F2uEEBLh4xCC1ZJZdxUAhjC6N6lrl74S8H2qcl9_AgT5h9_fy5QXThvq9uUONYQrxjZfPLfvUKVT3LsTAdn9sEcikydqXEOBCFYuC_QipW',
    progress: 0,
    duration: '25h 50m'
  }
];

export const RECENTLY_ADDED: Book[] = [
  {
     id: '7',
     title: 'Meditações',
     author: 'Marco Aurélio',
     cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP8tQIv7PTjc82ij2i1BGaEtCSkGq97TN-GRv88bdy-C0RIo2sGsqhOyDTRDCZQatk6Zs-ZPSukV1ly2tqIgILtsv4i0kJ80UuLvzwNNqEmhaeWUO6OLBlx79FNJkRPXt9xa_1vDi4Gw_zM3RBLkdd0CG7lAHI1U1aA5aa5faPH4QQb5cr_AMnPZ88z7U-7Le-ioY4hU6MiN-Ud2Tc2VInBQCMLTlj6G2KRt96VMvXoKjYEtUM462TMkcwLUC081DpyF6A-F24',
     progress: 0,
     duration: '5h 10m'
  },
  {
    id: '3',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdObnSzgZz51ZoIxQVZH-uqh4bJP-BhdAaSz3anNwRii-GDmkuDBHjcDkm94KxmexXzmQZ0InJUbl3e2PHEOdkcNe1_5GZbPWJ_Qw_tPiheZw6ZN3sc8qUtmUVFYBPoSJR0tLGkSKSIDCWEHjMUkrf4TWG28y20FKG6xz8X4_zhWgSxJZGG1DbAEUdR-2G3rS5FJTGP0T7qxlUrbUXQdoEXb_93ZMI9mo5StxjC5-b2XuBiaMrGU2ylR0a8sHKK5wMPl7PT5C3',
    progress: 0,
    duration: '4h 30m'
  }
]
