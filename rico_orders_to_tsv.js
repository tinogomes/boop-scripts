/**
    {
        "api":1,
        "name":"Rico Orders to CSV",
        "description":"Converts Rico Orders to CSV",
        "author":"tinogomes",
        "icon":"Text",
        "tags":"convert,b3,rico",
        "bias": -0.1
    }
**/

function main(input) {

  try {
    var data = input.text;

    const lines = data.split('\n');

    const header = lines.shift();

    if (!header.match(/\d\d\/\d\d\/\d\d\d\d,\w+/)) { throw `Requires on first line date and broker. ex: "27/05/2022,Rico"` }

    const [date, broker] = header.split(",");

    const regexp = /(?:IBOVESPA|DOLAR) MINI\s+((?:WIN|WDO)\w\d\d)\s+([VC])(?:ompra|enda)\s+(\d+)\s+R\$ [\d,.]+\s+(?:--|R\$ ([\d,.]+))\s+Totalmente (Cancelada|Executada)\s*/gm;
    const result = `${date}\t$1\t$2\t$3\t$4\t$5\t${broker}\n`;

    data = lines.join('\n').replace(regexp, result);
    data = data.replace(/.*Cancelada.*\n/gm, '');
    data = data.replace(/Executada/gm, '0,00');
    input.text = data
  }
  catch (err) {
    input.postError(err);
  }
}
