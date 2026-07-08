import {
  definePreset,
  defineRecipe,
  defineSemanticTokens,
} from "@pandacss/dev";
import type { RecipeConfig } from "@pandacss/types";

/** Static prose preset — vendored from pandacss-preset-typography to avoid v2 config bundling issues with tailwindcss CJS. */
const proseRecipe = defineRecipe({
  base: {
    '& [class~="lead"]': {
      color: "var(--colors-prose-lead)",
    },
    "& > :first-child": {
      marginTop: "0px",
    },
    "& > :last-child": {
      marginBottom: "0px",
    },
    "& a": {
      color: "var(--colors-prose-link)",
      fontWeight: "500",
      textDecoration: "underline",
    },
    "& a code": {
      color: "inherit",
    },
    "& a strong": {
      color: "inherit",
    },
    "& blockquote": {
      borderInlineStartColor: "var(--colors-prose-quote-border)",
      borderInlineStartWidth: "0.25rem",
      color: "var(--colors-prose-quote)",
      fontStyle: "italic",
      fontWeight: "500",
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
    },
    "& blockquote code": {
      color: "inherit",
    },
    "& blockquote p:first-of-type::before": {
      content: "open-quote",
    },
    "& blockquote p:last-of-type::after": {
      content: "close-quote",
    },
    "& blockquote strong": {
      color: "inherit",
    },
    "& code": {
      color: "var(--colors-prose-code)",
      fontWeight: "600",
    },
    "& code::after": {
      content: '"`"',
    },
    "& code::before": {
      content: '"`"',
    },
    "& dt": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
    },
    "& figcaption": {
      color: "var(--colors-prose-caption)",
    },
    "& h1": {
      color: "var(--colors-prose-heading)",
      fontWeight: "800",
    },
    "& h1 code": {
      color: "inherit",
    },
    "& h1 strong": {
      color: "inherit",
      fontWeight: "900",
    },
    "& h2": {
      color: "var(--colors-prose-heading)",
      fontWeight: "700",
    },
    "& h2 code": {
      color: "inherit",
    },
    "& h2 strong": {
      color: "inherit",
      fontWeight: "800",
    },
    "& h3": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
    },
    "& h3 code": {
      color: "inherit",
    },
    "& h3 strong": {
      color: "inherit",
      fontWeight: "700",
    },
    "& h4": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
    },
    "& h4 code": {
      color: "inherit",
    },
    "& h4 strong": {
      color: "inherit",
      fontWeight: "700",
    },
    "& hr": {
      borderColor: "var(--colors-prose-hr-border)",
      borderTopWidth: "1px",
    },
    "& kbd": {
      boxShadow:
        "0 0 0 1px var(--colors-prose-kbd-shadow), 0 3px 0 var(--colors-prose-kbd-shadow)",
      color: "var(--colors-prose-kbd)",
      fontFamily: "inherit",
      fontWeight: "500",
    },
    "& ol": {
      listStyleType: "decimal",
    },
    "& ol > li::marker": {
      color: "var(--colors-prose-counter)",
      fontWeight: "400",
    },
    '& ol[type="1"]': {
      listStyleType: "decimal",
    },
    '& ol[type="A" s]': {
      listStyleType: "upper-alpha",
    },
    '& ol[type="A"]': {
      listStyleType: "upper-alpha",
    },
    '& ol[type="a" s]': {
      listStyleType: "lower-alpha",
    },
    '& ol[type="a"]': {
      listStyleType: "lower-alpha",
    },
    '& ol[type="I" s]': {
      listStyleType: "upper-roman",
    },
    '& ol[type="I"]': {
      listStyleType: "upper-roman",
    },
    '& ol[type="i" s]': {
      listStyleType: "lower-roman",
    },
    '& ol[type="i"]': {
      listStyleType: "lower-roman",
    },
    "& picture": {
      display: "block",
    },
    "& pre": {
      backgroundColor: "var(--colors-prose-pre-bg)",
      color: "var(--colors-prose-pre-code)",
      fontWeight: "400",
      overflowX: "auto",
    },
    "& pre code": {
      backgroundColor: "transparent",
      borderRadius: "0px",
      borderWidth: "0px",
      color: "inherit",
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
      padding: "0px",
    },
    "& pre code::after": {
      content: "none",
    },
    "& pre code::before": {
      content: "none",
    },
    "& strong": {
      color: "var(--colors-prose-bold)",
      fontWeight: "600",
    },
    "& table": {
      marginBottom: "2em",
      marginTop: "2em",
      tableLayout: "auto",
      width: "100%",
    },
    "& tbody td": {
      verticalAlign: "baseline",
    },
    "& tbody tr": {
      borderBottomColor: "var(--colors-prose-td-border)",
      borderBottomWidth: "1px",
    },
    "& tbody tr:last-child": {
      borderBottomWidth: "0px",
    },
    "& tfoot": {
      borderTopColor: "var(--colors-prose-th-border)",
      borderTopWidth: "1px",
    },
    "& tfoot td": {
      verticalAlign: "top",
    },
    "& th, & td": {
      textAlign: "start",
    },
    "& thead": {
      borderBottomColor: "var(--colors-prose-th-border)",
      borderBottomWidth: "1px",
    },
    "& thead th": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
      verticalAlign: "bottom",
    },
    "& thead th code": {
      color: "inherit",
    },
    "& thead th strong": {
      color: "inherit",
    },
    "& ul": {
      listStyleType: "disc",
    },
    "& ul > li::marker": {
      color: "var(--colors-prose-bullet)",
    },
    color: "var(--colors-prose-body)",
    maxWidth: "65ch",
  },
  className: "prose",
  defaultVariants: {
    size: "base",
  },
  description: "Generated using 🐼 pandacss-preset-typography",
  variants: {
    size: {
      "2xl": {
        '& [class~="lead"]': {
          fontSize: "1.25em",
          lineHeight: "1.4666667",
          marginBottom: "1.0666667em",
          marginTop: "1.0666667em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& > ul > li p": {
          marginBottom: "0.8333333em",
          marginTop: "0.8333333em",
        },
        "& blockquote": {
          marginBottom: "1.7777778em",
          marginTop: "1.7777778em",
          paddingInlineStart: "1.1111111em",
        },
        "& code": {
          fontSize: "0.8333333em",
        },
        "& dd": {
          marginTop: "0.5em",
          paddingInlineStart: "1.5833333em",
        },
        "& dl": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
        },
        "& dt": {
          marginTop: "1.3333333em",
        },
        "& figcaption": {
          fontSize: "0.8333333em",
          lineHeight: "1.6",
          marginTop: "1em",
        },
        "& figure": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& figure > *": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& h1": {
          fontSize: "2.6666667em",
          lineHeight: "1",
          marginBottom: "0.875em",
          marginTop: "0px",
        },
        "& h2": {
          fontSize: "2em",
          lineHeight: "1.0833333",
          marginBottom: "0.8333333em",
          marginTop: "1.5em",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h2 code": {
          fontSize: "0.875em",
        },
        "& h3": {
          fontSize: "1.5em",
          lineHeight: "1.2222222",
          marginBottom: "0.6666667em",
          marginTop: "1.5555556em",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h3 code": {
          fontSize: "0.8888889em",
        },
        "& h4": {
          lineHeight: "1.5",
          marginBottom: "0.6666667em",
          marginTop: "1.6666667em",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& hr": {
          marginBottom: "3em",
          marginTop: "3em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& img": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& kbd": {
          borderRadius: "0.375rem",
          fontSize: "0.8333333em",
          paddingBottom: "0.25em",
          paddingInlineEnd: "0.3333333em",
          paddingInlineStart: "0.3333333em",
          paddingTop: "0.25em",
        },
        "& li": {
          marginBottom: "0.5em",
          marginTop: "0.5em",
        },
        "& ol": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
          paddingInlineStart: "1.5833333em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4166667em",
        },
        "& p": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
        },
        "& picture": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& picture > img": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& pre": {
          borderRadius: "0.5rem",
          fontSize: "0.8333333em",
          lineHeight: "1.8",
          marginBottom: "2em",
          marginTop: "2em",
          paddingBottom: "1.2em",
          paddingInlineEnd: "1.6em",
          paddingInlineStart: "1.6em",
          paddingTop: "1.2em",
        },
        "& table": {
          fontSize: "0.8333333em",
          lineHeight: "1.4",
        },
        "& tbody td, & tfoot td": {
          paddingBottom: "0.8em",
          paddingInlineEnd: "0.6em",
          paddingInlineStart: "0.6em",
          paddingTop: "0.8em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& thead th": {
          paddingBottom: "0.8em",
          paddingInlineEnd: "0.6em",
          paddingInlineStart: "0.6em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& ul": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
          paddingInlineStart: "1.5833333em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4166667em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginBottom: "0.6666667em",
          marginTop: "0.6666667em",
        },
        "& video": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        fontSize: "1.5rem",
        lineHeight: "1.6666667",
      },
      base: {
        '& [class~="lead"]': {
          fontSize: "1.25em",
          lineHeight: "1.6",
          marginBottom: "1.2em",
          marginTop: "1.2em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.25em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.25em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.25em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.25em",
        },
        "& > ul > li p": {
          marginBottom: "0.75em",
          marginTop: "0.75em",
        },
        "& blockquote": {
          marginBottom: "1.6em",
          marginTop: "1.6em",
          paddingInlineStart: "1em",
        },
        "& code": {
          fontSize: "0.875em",
        },
        "& dd": {
          marginTop: "0.5em",
          paddingInlineStart: "1.625em",
        },
        "& dl": {
          marginBottom: "1.25em",
          marginTop: "1.25em",
        },
        "& dt": {
          marginTop: "1.25em",
        },
        "& figcaption": {
          fontSize: "0.875em",
          lineHeight: "1.4285714",
          marginTop: "0.8571429em",
        },
        "& figure": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& figure > *": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& h1": {
          fontSize: "2.25em",
          lineHeight: "1.1111111",
          marginBottom: "0.8888889em",
          marginTop: "0px",
        },
        "& h2": {
          fontSize: "1.5em",
          lineHeight: "1.3333333",
          marginBottom: "1em",
          marginTop: "2em",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h2 code": {
          fontSize: "0.875em",
        },
        "& h3": {
          fontSize: "1.25em",
          lineHeight: "1.6",
          marginBottom: "0.6em",
          marginTop: "1.6em",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h3 code": {
          fontSize: "0.9em",
        },
        "& h4": {
          lineHeight: "1.5",
          marginBottom: "0.5em",
          marginTop: "1.5em",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& hr": {
          marginBottom: "3em",
          marginTop: "3em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& img": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& kbd": {
          borderRadius: "0.3125rem",
          fontSize: "0.875em",
          paddingBottom: "0.1875em",
          paddingInlineEnd: "0.375em",
          paddingInlineStart: "0.375em",
          paddingTop: "0.1875em",
        },
        "& li": {
          marginBottom: "0.5em",
          marginTop: "0.5em",
        },
        "& ol": {
          marginBottom: "1.25em",
          marginTop: "1.25em",
          paddingInlineStart: "1.625em",
        },
        "& ol > li": {
          paddingInlineStart: "0.375em",
        },
        "& p": {
          marginBottom: "1.25em",
          marginTop: "1.25em",
        },
        "& picture": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& picture > img": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& pre": {
          borderRadius: "0.375rem",
          fontSize: "0.875em",
          lineHeight: "1.7142857",
          marginBottom: "1.7142857em",
          marginTop: "1.7142857em",
          paddingBottom: "0.8571429em",
          paddingInlineEnd: "1.1428571em",
          paddingInlineStart: "1.1428571em",
          paddingTop: "0.8571429em",
        },
        "& table": {
          fontSize: "0.875em",
          lineHeight: "1.7142857",
        },
        "& tbody td, & tfoot td": {
          paddingBottom: "0.5714286em",
          paddingInlineEnd: "0.5714286em",
          paddingInlineStart: "0.5714286em",
          paddingTop: "0.5714286em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& thead th": {
          paddingBottom: "0.5714286em",
          paddingInlineEnd: "0.5714286em",
          paddingInlineStart: "0.5714286em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& ul": {
          marginBottom: "1.25em",
          marginTop: "1.25em",
          paddingInlineStart: "1.625em",
        },
        "& ul > li": {
          paddingInlineStart: "0.375em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginBottom: "0.75em",
          marginTop: "0.75em",
        },
        "& video": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        fontSize: "1rem",
        lineHeight: "1.75",
      },
      lg: {
        '& [class~="lead"]': {
          fontSize: "1.2222222em",
          lineHeight: "1.4545455",
          marginBottom: "1.0909091em",
          marginTop: "1.0909091em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& > ul > li p": {
          marginBottom: "0.8888889em",
          marginTop: "0.8888889em",
        },
        "& blockquote": {
          marginBottom: "1.6666667em",
          marginTop: "1.6666667em",
          paddingInlineStart: "1em",
        },
        "& code": {
          fontSize: "0.8888889em",
        },
        "& dd": {
          marginTop: "0.6666667em",
          paddingInlineStart: "1.5555556em",
        },
        "& dl": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
        },
        "& dt": {
          marginTop: "1.3333333em",
        },
        "& figcaption": {
          fontSize: "0.8888889em",
          lineHeight: "1.5",
          marginTop: "1em",
        },
        "& figure": {
          marginBottom: "1.7777778em",
          marginTop: "1.7777778em",
        },
        "& figure > *": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& h1": {
          fontSize: "2.6666667em",
          lineHeight: "1",
          marginBottom: "0.8333333em",
          marginTop: "0px",
        },
        "& h2": {
          fontSize: "1.6666667em",
          lineHeight: "1.3333333",
          marginBottom: "1.0666667em",
          marginTop: "1.8666667em",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h2 code": {
          fontSize: "0.8666667em",
        },
        "& h3": {
          fontSize: "1.3333333em",
          lineHeight: "1.5",
          marginBottom: "0.6666667em",
          marginTop: "1.6666667em",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h3 code": {
          fontSize: "0.875em",
        },
        "& h4": {
          lineHeight: "1.5555556",
          marginBottom: "0.4444444em",
          marginTop: "1.7777778em",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& hr": {
          marginBottom: "3.1111111em",
          marginTop: "3.1111111em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& img": {
          marginBottom: "1.7777778em",
          marginTop: "1.7777778em",
        },
        "& kbd": {
          borderRadius: "0.3125rem",
          fontSize: "0.8888889em",
          paddingBottom: "0.2222222em",
          paddingInlineEnd: "0.4444444em",
          paddingInlineStart: "0.4444444em",
          paddingTop: "0.2222222em",
        },
        "& li": {
          marginBottom: "0.6666667em",
          marginTop: "0.6666667em",
        },
        "& ol": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
          paddingInlineStart: "1.5555556em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4444444em",
        },
        "& p": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
        },
        "& picture": {
          marginBottom: "1.7777778em",
          marginTop: "1.7777778em",
        },
        "& picture > img": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& pre": {
          borderRadius: "0.375rem",
          fontSize: "0.8888889em",
          lineHeight: "1.75",
          marginBottom: "2em",
          marginTop: "2em",
          paddingBottom: "1em",
          paddingInlineEnd: "1.5em",
          paddingInlineStart: "1.5em",
          paddingTop: "1em",
        },
        "& table": {
          fontSize: "0.8888889em",
          lineHeight: "1.5",
        },
        "& tbody td, & tfoot td": {
          paddingBottom: "0.75em",
          paddingInlineEnd: "0.75em",
          paddingInlineStart: "0.75em",
          paddingTop: "0.75em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& thead th": {
          paddingBottom: "0.75em",
          paddingInlineEnd: "0.75em",
          paddingInlineStart: "0.75em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& ul": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
          paddingInlineStart: "1.5555556em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4444444em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginBottom: "0.8888889em",
          marginTop: "0.8888889em",
        },
        "& video": {
          marginBottom: "1.7777778em",
          marginTop: "1.7777778em",
        },
        fontSize: "1.125rem",
        lineHeight: "1.7777778",
      },
      sm: {
        '& [class~="lead"]': {
          fontSize: "1.2857143em",
          lineHeight: "1.5555556",
          marginBottom: "0.8888889em",
          marginTop: "0.8888889em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.1428571em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.1428571em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.1428571em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.1428571em",
        },
        "& > ul > li p": {
          marginBottom: "0.5714286em",
          marginTop: "0.5714286em",
        },
        "& blockquote": {
          marginBottom: "1.3333333em",
          marginTop: "1.3333333em",
          paddingInlineStart: "1.1111111em",
        },
        "& code": {
          fontSize: "0.8571429em",
        },
        "& dd": {
          marginTop: "0.2857143em",
          paddingInlineStart: "1.5714286em",
        },
        "& dl": {
          marginBottom: "1.1428571em",
          marginTop: "1.1428571em",
        },
        "& dt": {
          marginTop: "1.1428571em",
        },
        "& figcaption": {
          fontSize: "0.8571429em",
          lineHeight: "1.3333333",
          marginTop: "0.6666667em",
        },
        "& figure": {
          marginBottom: "1.7142857em",
          marginTop: "1.7142857em",
        },
        "& figure > *": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& h1": {
          fontSize: "2.1428571em",
          lineHeight: "1.2",
          marginBottom: "0.8em",
          marginTop: "0px",
        },
        "& h2": {
          fontSize: "1.4285714em",
          lineHeight: "1.4",
          marginBottom: "0.8em",
          marginTop: "1.6em",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h2 code": {
          fontSize: "0.9em",
        },
        "& h3": {
          fontSize: "1.2857143em",
          lineHeight: "1.5555556",
          marginBottom: "0.4444444em",
          marginTop: "1.5555556em",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h3 code": {
          fontSize: "0.8888889em",
        },
        "& h4": {
          lineHeight: "1.4285714",
          marginBottom: "0.5714286em",
          marginTop: "1.4285714em",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& hr": {
          marginBottom: "2.8571429em",
          marginTop: "2.8571429em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& img": {
          marginBottom: "1.7142857em",
          marginTop: "1.7142857em",
        },
        "& kbd": {
          borderRadius: "0.3125rem",
          fontSize: "0.8571429em",
          paddingBottom: "0.1428571em",
          paddingInlineEnd: "0.3571429em",
          paddingInlineStart: "0.3571429em",
          paddingTop: "0.1428571em",
        },
        "& li": {
          marginBottom: "0.2857143em",
          marginTop: "0.2857143em",
        },
        "& ol": {
          marginBottom: "1.1428571em",
          marginTop: "1.1428571em",
          paddingInlineStart: "1.5714286em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4285714em",
        },
        "& p": {
          marginBottom: "1.1428571em",
          marginTop: "1.1428571em",
        },
        "& picture": {
          marginBottom: "1.7142857em",
          marginTop: "1.7142857em",
        },
        "& picture > img": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& pre": {
          borderRadius: "0.25rem",
          fontSize: "0.8571429em",
          lineHeight: "1.6666667",
          marginBottom: "1.6666667em",
          marginTop: "1.6666667em",
          paddingBottom: "0.6666667em",
          paddingInlineEnd: "1em",
          paddingInlineStart: "1em",
          paddingTop: "0.6666667em",
        },
        "& table": {
          fontSize: "0.8571429em",
          lineHeight: "1.5",
        },
        "& tbody td, & tfoot td": {
          paddingBottom: "0.6666667em",
          paddingInlineEnd: "1em",
          paddingInlineStart: "1em",
          paddingTop: "0.6666667em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& thead th": {
          paddingBottom: "0.6666667em",
          paddingInlineEnd: "1em",
          paddingInlineStart: "1em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& ul": {
          marginBottom: "1.1428571em",
          marginTop: "1.1428571em",
          paddingInlineStart: "1.5714286em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4285714em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginBottom: "0.5714286em",
          marginTop: "0.5714286em",
        },
        "& video": {
          marginBottom: "1.7142857em",
          marginTop: "1.7142857em",
        },
        fontSize: "0.875rem",
        lineHeight: "1.7142857",
      },
      xl: {
        '& [class~="lead"]': {
          fontSize: "1.2em",
          lineHeight: "1.5",
          marginBottom: "1em",
          marginTop: "1em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.2em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.2em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.2em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.2em",
        },
        "& > ul > li p": {
          marginBottom: "0.8em",
          marginTop: "0.8em",
        },
        "& blockquote": {
          marginBottom: "1.6em",
          marginTop: "1.6em",
          paddingInlineStart: "1.0666667em",
        },
        "& code": {
          fontSize: "0.9em",
        },
        "& dd": {
          marginTop: "0.6em",
          paddingInlineStart: "1.6em",
        },
        "& dl": {
          marginBottom: "1.2em",
          marginTop: "1.2em",
        },
        "& dt": {
          marginTop: "1.2em",
        },
        "& figcaption": {
          fontSize: "0.9em",
          lineHeight: "1.5555556",
          marginTop: "1em",
        },
        "& figure": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& figure > *": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& h1": {
          fontSize: "2.8em",
          lineHeight: "1",
          marginBottom: "0.8571429em",
          marginTop: "0px",
        },
        "& h2": {
          fontSize: "1.8em",
          lineHeight: "1.1111111",
          marginBottom: "0.8888889em",
          marginTop: "1.5555556em",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h2 code": {
          fontSize: "0.8611111em",
        },
        "& h3": {
          fontSize: "1.5em",
          lineHeight: "1.3333333",
          marginBottom: "0.6666667em",
          marginTop: "1.6em",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h3 code": {
          fontSize: "0.9em",
        },
        "& h4": {
          lineHeight: "1.6",
          marginBottom: "0.6em",
          marginTop: "1.8em",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& hr": {
          marginBottom: "2.8em",
          marginTop: "2.8em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& img": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& kbd": {
          borderRadius: "0.3125rem",
          fontSize: "0.9em",
          paddingBottom: "0.25em",
          paddingInlineEnd: "0.4em",
          paddingInlineStart: "0.4em",
          paddingTop: "0.25em",
        },
        "& li": {
          marginBottom: "0.6em",
          marginTop: "0.6em",
        },
        "& ol": {
          marginBottom: "1.2em",
          marginTop: "1.2em",
          paddingInlineStart: "1.6em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4em",
        },
        "& p": {
          marginBottom: "1.2em",
          marginTop: "1.2em",
        },
        "& picture": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        "& picture > img": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& pre": {
          borderRadius: "0.5rem",
          fontSize: "0.9em",
          lineHeight: "1.7777778",
          marginBottom: "2em",
          marginTop: "2em",
          paddingBottom: "1.1111111em",
          paddingInlineEnd: "1.3333333em",
          paddingInlineStart: "1.3333333em",
          paddingTop: "1.1111111em",
        },
        "& table": {
          fontSize: "0.9em",
          lineHeight: "1.5555556",
        },
        "& tbody td, & tfoot td": {
          paddingBottom: "0.8888889em",
          paddingInlineEnd: "0.6666667em",
          paddingInlineStart: "0.6666667em",
          paddingTop: "0.8888889em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& thead th": {
          paddingBottom: "0.8888889em",
          paddingInlineEnd: "0.6666667em",
          paddingInlineStart: "0.6666667em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& ul": {
          marginBottom: "1.2em",
          marginTop: "1.2em",
          paddingInlineStart: "1.6em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginBottom: "0.8em",
          marginTop: "0.8em",
        },
        "& video": {
          marginBottom: "2em",
          marginTop: "2em",
        },
        fontSize: "1.25rem",
        lineHeight: "1.8",
      },
    },
  },
} as RecipeConfig);

const proseSemanticTokens = defineSemanticTokens({
  colors: {
    prose: {
      body: {
        value: "{colors.slate.700}",
      },
      bold: {
        value: "{colors.slate.900}",
      },
      bullet: {
        value: "{colors.slate.300}",
      },
      caption: {
        value: "{colors.slate.500}",
      },
      code: {
        value: "{colors.slate.900}",
      },
      counter: {
        value: "{colors.slate.500}",
      },
      heading: {
        value: "{colors.slate.900}",
      },
      hrBorder: {
        value: "{colors.slate.200}",
      },
      kbd: {
        value: "{colors.slate.900}",
      },
      kbdShadow: {
        value: "0 0 0",
      },
      lead: {
        value: "{colors.slate.600}",
      },
      link: {
        value: "{colors.slate.900}",
      },
      preBg: {
        value: "{colors.slate.800}",
      },
      preCode: {
        value: "{colors.slate.200}",
      },
      quote: {
        value: "{colors.slate.900}",
      },
      quoteBorder: {
        value: "{colors.slate.200}",
      },
      tdBorder: {
        value: "{colors.slate.200}",
      },
      thBorder: {
        value: "{colors.slate.300}",
      },
    },
  },
});

export default definePreset({
  name: "typography",
  theme: {
    extend: {
      recipes: {
        prose: proseRecipe,
      },
      semanticTokens: proseSemanticTokens,
    },
  },
});
