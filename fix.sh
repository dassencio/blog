#!/usr/bin/env bash

set -e

# Fix titles.
gsed -i 's/<h3>\([^<]*\)<\/h3>/<SectionTitle>\1<\/SectionTitle>/g' $1

# Fix italic text.
awk '
BEGIN {
    RS="<span class=(\"italic\"|'\''italic'\'')>|</span>"; ORS="";
}
NR%2==0 {
    print "<i>" $0 "</i>";
}
NR%2!=0 {
    print $0;
}
' "$1" > "__tmpfile__" && mv "__tmpfile__" "$1"

# Fix monospace text.
awk '
BEGIN {
    RS="<span class=(\"msnw\"|'\''msnw'\'')>|</span>"; ORS="";
}
NR%2==0 {
    print "<code>" $0 "</code>";
}
NR%2!=0 {
    print $0;
}
' "$1" > "__tmpfile__" && mv "__tmpfile__" "$1"

# Fix equations.
awk '
BEGIN {
    RS="\\$\\$"; ORS="";
}
NR%2==0 {
    print "</p>\n\n<EquationBlock>" $0 "</EquationBlock>\n\n<p>";
}
NR%2!=0 {
    print $0;
}
' "$1" > "__tmpfile__" && mv "__tmpfile__" "$1"

# Fix equation contents.
gsed -i 's/\displaystyle//g' $1
gsed -i 's/&amp;=&amp;/\&=/g' $1
gsed -i 's/\\nonumber\\\\\[5pt]/\\\\/g' $1
gsed -i 's/%INDEX%_//g' $1
gsed -i 's/\\times/\\cdot/g' $1

# Fix code (partially).
awk '
BEGIN {
  RS="</div>"
  ORS=""
}
{
  gsub(/<div class=['"'"'"]code['"'"'"]><pre>/, "<CodeBlock code=\"")
  gsub(/<\/pre>/, "\" \/>")
  print
}
' "$1" > "__tmpfile__" && mv "__tmpfile__" "$1"

gsed -i "/<div class=['\"]code-after-code['\"]>/d" $1

# Fix figure links.
gsed -i "s/<a href=\"#fig_$i\">figure $i<\/a>/<FigureLink :id=\"CHANGE-$i\" \/>/g" $1
gsed -i "s/<a href=\"#fig_$i\">Figure $i<\/a>/<FigureLink :id=\"CHANGE-$i\" \/>/g" $1

# Replace tabs with spaces.
gsed -i 's/\t/  /g' $1

# Other fixes.
gsed -i "s/you are/you're/g" $1
