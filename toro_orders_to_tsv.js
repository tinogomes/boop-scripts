/**
    {
        "api":1,
        "name":"Toro Orders to CSV",
        "description":"Converts Toro Orders to CSV",
        "author":"tinogomes",
        "icon":"Text",
        "tags":"convert,b3,wdo,win,toro",
        "bias": -0.1
    }
**/

function main(input) {
  try {
    const today = new Date();

    const todayArray = [
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear(),
    ];

    if (todayArray[0] < 10) {
      todayArray[0] = '0' + todayArray[0];
    }

    if (todayArray[1] < 10) {
      todayArray[1] = '0' + todayArray[1];
    }

    input.text = input.text
      .replace(/(Fechada|\d\d:\d\d|Totalmente executada|Futuro|Entrada|ompra|enda|R\$ 0,00)\n?/g, '')
      .replace(/pts/g, '')
      .replace(/\n/g, ' ')
      .replace(/ +/g, ' ')
      .replace(/^$/, '')
      .replace(/ (WIN|WDO)/g, `\n${todayArray.join("/")} $1`)
      .replace(/,/g, '')
      .replace(/(\d+)([05]0)/g, '$1,$2 0 Toro')
      .replace(/Toro +/g, 'Toro')
      .replace(/ +/g, '\t')
      .replace(/\n(\d)/, '$1')
  }
  catch (err) {
    input.postError(err);
  }
}
