#!/usr/bin/env bash

set -e

post_id=$1
post_file="./src/posts/${post_id}.vue"

if [ -z "$post_id" ]; then
  echo "Usage: $0 <post-id>"
  exit 1
fi

if [ ! -f "$post_file" ]; then
  echo "File $post_file does not exist."
  exit 1
fi

# Fix titles.
gsed -i 's/<h3>\([^<]*\)<\/h3>/<SectionTitle>\1<\/SectionTitle>/g' "$post_file"

# Fix bold text.
awk '
BEGIN {
    RS="<span class=(\"bold\"|'\''bold'\'')>|</span>"; ORS="";
}
NR%2==0 {
    print "<b>" $0 "</b>";
}
NR%2!=0 {
    print $0;
}
' "$post_file" > "__tmpfile__" && mv "__tmpfile__" "$post_file"

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
' "$post_file" > "__tmpfile__" && mv "__tmpfile__" "$post_file"

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
' "$post_file" > "__tmpfile__" && mv "__tmpfile__" "$post_file"

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
' "$post_file" > "__tmpfile__" && mv "__tmpfile__" "$post_file"

# Fix equation contents.
gsed -i 's/\displaystyle//g' "$post_file"
gsed -i 's/&amp;=&amp;/\&=/g' "$post_file"
gsed -i 's/\\nonumber\\\\\[5pt]/\\\\/g' "$post_file"
gsed -i 's/%INDEX%_//g' "$post_file"
gsed -i 's/\\times/\\cdot/g' "$post_file"

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
' "$post_file" > "__tmpfile__" && mv "__tmpfile__" "$post_file"

gsed -i "/<div class=['\"]code-after-code['\"]>/d" "$post_file"

# Fix figure links.
gsed -i "s/<a href=\"#fig_$i\">figure $i<\/a>/<FigureLink :id=\"CHANGE-$i\" \/>/g" "$post_file"
gsed -i "s/<a href=\"#fig_$i\">Figure $i<\/a>/<FigureLink :id=\"CHANGE-$i\" \/>/g" "$post_file"

# Replace tabs with spaces.
gsed -i 's/\t/  /g' "$post_file"

# Other fixes.
gsed -i "s/you are/you're/g" "$post_file"
