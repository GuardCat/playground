// Меняет цвет всех элементов страницы

var tags=
  ["div","p","td","span","body","input"],
  bc="#404040",
  c="#bfbfa0"
;

for (var y=0;y<tags.length;y++)
{
  with(document)
  {
    for(var x=0;x<getElementsByTagName(tags[y]).length; x++)
    {
      with(getElementsByTagName(tags[y])[x])
      {
        style.backgroundColor=bc;
        style.color=c;
      }
    }
  }
}
