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
import ListBlockItem from "@/components/ListBlockItem.vue";
import MapBlock from "@/components/MapBlock.vue";
import NoteBlock from "@/components/NoteBlock.vue";
import ReferenceLink from "@/components/ReferenceLink.vue";
import ReferenceListBlock from "@/components/ReferenceListBlock.vue";
import ReferenceListBlockItem from "@/components/ReferenceListBlockItem.vue";
import ResponsiveForm from "@/components/ResponsiveForm.vue";
import ResponsiveImage from "@/components/ResponsiveImage.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import TableBlock from "@/components/TableBlock.vue";
import TableLink from "@/components/TableLink.vue";

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
    ListBlockItem: typeof ListBlockItem;
    MapBlock: typeof MapBlock;
    NoteBlock: typeof NoteBlock;
    ReferenceLink: typeof ReferenceLink;
    ReferenceListBlock: typeof ReferenceListBlock;
    ReferenceListBlockItem: typeof ReferenceListBlockItem;
    ResponsiveForm: typeof ResponsiveForm;
    ResponsiveImage: typeof ResponsiveImage;
    SectionTitle: typeof SectionTitle;
    TableBlock: typeof TableBlock;
    TableLink: typeof TableLink;
  }
}
