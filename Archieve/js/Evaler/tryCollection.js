d = new Collection;

d.pushCollection( {types: ["Питание", "Проезд", "Продукты"]} )
d.pushCollection({
  transactions: [
    { id: 0, name: "кофе", date: new Date("2012/12/01 12:30"), type: 0, sum: 25 },
    { id: 1, name: "Проезд", date: new Date("2012/12/01 19:00"), type: 1, sum: 70 },
    { id: 2, name: "Продукты", date: new Date("2012/12/01 19:30"), type: 2, sum: 720 },
    { id: 3, name: "Маршрутка", date: new Date("2012/12/01 19:50"), type: 1, sum: 13 } 
  ]
})