import BaseButton from "@/components/BaseButton.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseSubfigure from "@/components/BaseSubfigure.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import EquationBlock from "@/components/EquationBlock.vue";
import FigureBlock from "@/components/FigureBlock.vue";
import FigureLink from "@/components/FigureLink.vue";
import FlotChart from "@/components/FlotChart.vue";
import InputField from "@/components/InputField.vue";
import ListBlock from "@/components/ListBlock.vue";
import ListItem from "@/components/ListItem.vue";
import MapBlock from "@/components/MapBlock.vue";
import ResponsiveForm from "@/components/ResponsiveForm.vue";
import ResponsiveImage from "@/components/ResponsiveImage.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import TableBlock from "@/components/TableBlock.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BaseButton: typeof BaseButton;
    BaseCheckbox: typeof BaseCheckbox;
    BaseSubfigure: typeof BaseSubfigure;
    CodeBlock: typeof CodeBlock;
    EquationBlock: typeof EquationBlock;
    FigureBlock: typeof FigureBlock;
    FigureLink: typeof FigureLink;
    FlotChart: typeof FlotChart;
    InputField: typeof InputField;
    ListBlock: typeof ListBlock;
    ListItem: typeof ListItem;
    MapBlock: typeof MapBlock;
    ResponsiveForm: typeof ResponsiveForm;
    ResponsiveImage: typeof ResponsiveImage;
    SectionTitle: typeof SectionTitle;
    TableBlock: typeof TableBlock;
  }
}
