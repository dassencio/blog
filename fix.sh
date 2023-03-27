#!/usr/bin/env bash

# set -ex
set -e

for i in {1..9}
do
  # Fix titles.
  gsed -i 's/<h3>\([^<]*\)<\/h3>/<SectionTitle>\1<\/SectionTitle>/g' $1

  # Fix monospace text.
  gsed -i 's/<span class="msnw">\([^<]*\)<\/span>/<code>\1<\/code>/g' $1
  gsed -i "s/<span class='msnw'>\([^<]*\)<\/span>/<code>\1<\/code>/g" $1

  # Fix italic text.
  gsed -i 's/<span class="italic">\([^<]*\)<\/span>/<i>\1<\/i>/g' $1

  # Fix bold text.
  gsed -i 's/<span class="bold">\([^<]*\)<\/span>/<b>\1<\/b>/g' $1

  # Fix equations.
  for i in 1 .. 999
  do
    gsed -i '0,/\$\$/s//<\/p>\n\n<EquationBlock>\n/' $1
    gsed -i '0,/\$\$/s//<\/EquationBlock>\n\n<p>\n/' $1
  done
  gsed -i 's/\displaystyle//g' $1
  gsed -i 's/&amp;=&amp;/\&=/g' $1
  gsed -i 's/\\nonumber\\\\\[5pt]/\\\\/g' $1
  gsed -i 's/%INDEX%_//g' $1
  gsed -i 's/\\times/\\cdot/g' $1

  # Fix code (partially).
  gsed -i 's/<div class="code"><pre>/<CodeBlock code="/g' $1
  gsed -i "s/<div class='code'><pre>/<CodeBlock code=\"/g" $1
  gsed -i 's/<\/div><\/pre>/  " \/>/g' $1
  gsed -i 's/<div class="code">/<CodeBlock code="/g' $1
  gsed -i "s/<div class='code'>/<CodeBlock code=\"/g" $1
  gsed -i 's/<pre>//g' $1
  gsed -i 's/<\/pre>//g' $1
  gsed -i 's/<span class="highlight-code">\([^<]*\)<\/span>/**\1**/g' $1
  gsed -i "s/<span class='highlight-code'>\([^<]*\)<\/span>/**\1**/g" $1

  # Fix figure links.
  for i in {1..99}
  do
    gsed -i "s/<a href=\"#fig_$i\">figure $i<\/a>/<FigureLink :id=\"CHANGE-$i\" \/>/g" $1
    gsed -i "s/<a href=\"#fig_$i\">Figure $i<\/a>/<FigureLink :id=\"CHANGE-$i\" \/>/g" $1
  done

  # Replace tabs with spaces.
  gsed -i 's/\t/  /g' $1

  # Other fixes.
  gsed -i "s/you are/you're/g" $1
done
