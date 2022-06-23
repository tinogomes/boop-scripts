/**
    {
        "api":1,
        "name":"Metatrader Orders to CSV",
        "description":"Converts metatrader Orders to CSV",
        "author":"tinogomes",
        "icon":"Text",
        "tags":"convert,b3,metatrader",
        "bias": -0.1
    }
**/

function main(input) {

  try {
    var data = input.text;

    const lines = data.split('\n');

    const header = lines.shift();

    if (!header.match(/\d\d\/\d\d\/\d\d\d\d,\w+/)) { throw `Requires Date,Broker on first line` }

    const [date, broker] = header.split(",");

    const regexp = /^(\d{4})\.(\d\d)\.(\d\d).*((?:WIN|WDO).\d\d).*(sell|buy)\D*(\d+)\D*([0-9]+(?:\.\d\d)?).*$/gm;
    const result = `$3/$2/$1\t$4\t$5\t$6\t$7\t0,00\t${broker}`;

    data = lines.join('\n').replace(regexp, result);
    data = data.replaceAll('.', ',');
    data = data.replaceAll('buy', 'C');
    data = data.replaceAll('sell', 'V');
    input.text = data
  }
  catch (err) {
    input.postError(err);
  }
}
