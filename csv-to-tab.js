/**
    {
        "api":1,
        "name":"CSV TO TSV",
        "description":"Converts CSV to TSV",
        "author":"tinogomes",
        "icon":"Text",
        "tags":"convert,csv,tsv",
        "bias": -0.1
    }
**/

function main(input) {

  try {
    var data = input.text;

    const lines = data.split('\n');

    const header = lines.shift();

    //              2022.07.01 12.78 13.21 12.73 13.18 30805 17593400  1
    const regexp = //gm;
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
