import {
  definePreset,
  defineRecipe,
  defineSemanticTokens,
} from "@pandacss/dev";
import type { RecipeConfig } from "@pandacss/types";

/** Static prose preset — vendored from pandacss-preset-typography to avoid v2 config bundling issues with tailwindcss CJS. */
const proseRecipe = defineRecipe({
  className: "prose",
  description: "Generated using 🐼 pandacss-preset-typography",
  base: {
    color: "var(--colors-prose-body)",
    maxWidth: "65ch",
    '& [class~="lead"]': {
      color: "var(--colors-prose-lead)",
    },
    "& a": {
      color: "var(--colors-prose-link)",
      textDecoration: "underline",
      fontWeight: "500",
    },
    "& strong": {
      color: "var(--colors-prose-bold)",
      fontWeight: "600",
    },
    "& a strong": {
      color: "inherit",
    },
    "& blockquote strong": {
      color: "inherit",
    },
    "& thead th strong": {
      color: "inherit",
    },
    "& ol": {
      listStyleType: "decimal",
    },
    '& ol[type="A"]': {
      listStyleType: "upper-alpha",
    },
    '& ol[type="a"]': {
      listStyleType: "lower-alpha",
    },
    '& ol[type="A" s]': {
      listStyleType: "upper-alpha",
    },
    '& ol[type="a" s]': {
      listStyleType: "lower-alpha",
    },
    '& ol[type="I"]': {
      listStyleType: "upper-roman",
    },
    '& ol[type="i"]': {
      listStyleType: "lower-roman",
    },
    '& ol[type="I" s]': {
      listStyleType: "upper-roman",
    },
    '& ol[type="i" s]': {
      listStyleType: "lower-roman",
    },
    '& ol[type="1"]': {
      listStyleType: "decimal",
    },
    "& ul": {
      listStyleType: "disc",
    },
    "& ol > li::marker": {
      fontWeight: "400",
      color: "var(--colors-prose-counter)",
    },
    "& ul > li::marker": {
      color: "var(--colors-prose-bullet)",
    },
    "& dt": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
    },
    "& hr": {
      borderColor: "var(--colors-prose-hr-border)",
      borderTopWidth: "1px",
    },
    "& blockquote": {
      fontWeight: "500",
      fontStyle: "italic",
      color: "var(--colors-prose-quote)",
      borderInlineStartWidth: "0.25rem",
      borderInlineStartColor: "var(--colors-prose-quote-border)",
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
    },
    "& blockquote p:first-of-type::before": {
      content: "open-quote",
    },
    "& blockquote p:last-of-type::after": {
      content: "close-quote",
    },
    "& h1": {
      color: "var(--colors-prose-heading)",
      fontWeight: "800",
    },
    "& h1 strong": {
      fontWeight: "900",
      color: "inherit",
    },
    "& h2": {
      color: "var(--colors-prose-heading)",
      fontWeight: "700",
    },
    "& h2 strong": {
      fontWeight: "800",
      color: "inherit",
    },
    "& h3": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
    },
    "& h3 strong": {
      fontWeight: "700",
      color: "inherit",
    },
    "& h4": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
    },
    "& h4 strong": {
      fontWeight: "700",
      color: "inherit",
    },
    "& picture": {
      display: "block",
    },
    "& kbd": {
      fontWeight: "500",
      fontFamily: "inherit",
      color: "var(--colors-prose-kbd)",
      boxShadow:
        "0 0 0 1px var(--colors-prose-kbd-shadow), 0 3px 0 var(--colors-prose-kbd-shadow)",
    },
    "& code": {
      color: "var(--colors-prose-code)",
      fontWeight: "600",
    },
    "& code::before": {
      content: '"`"',
    },
    "& code::after": {
      content: '"`"',
    },
    "& a code": {
      color: "inherit",
    },
    "& h1 code": {
      color: "inherit",
    },
    "& h2 code": {
      color: "inherit",
    },
    "& h3 code": {
      color: "inherit",
    },
    "& h4 code": {
      color: "inherit",
    },
    "& blockquote code": {
      color: "inherit",
    },
    "& thead th code": {
      color: "inherit",
    },
    "& pre": {
      color: "var(--colors-prose-pre-code)",
      backgroundColor: "var(--colors-prose-pre-bg)",
      overflowX: "auto",
      fontWeight: "400",
    },
    "& pre code": {
      backgroundColor: "transparent",
      borderWidth: "0px",
      borderRadius: "0px",
      padding: "0px",
      fontWeight: "inherit",
      color: "inherit",
      fontSize: "inherit",
      fontFamily: "inherit",
      lineHeight: "inherit",
    },
    "& pre code::before": {
      content: "none",
    },
    "& pre code::after": {
      content: "none",
    },
    "& table": {
      width: "100%",
      tableLayout: "auto",
      marginTop: "2em",
      marginBottom: "2em",
    },
    "& thead": {
      borderBottomWidth: "1px",
      borderBottomColor: "var(--colors-prose-th-border)",
    },
    "& thead th": {
      color: "var(--colors-prose-heading)",
      fontWeight: "600",
      verticalAlign: "bottom",
    },
    "& tbody tr": {
      borderBottomWidth: "1px",
      borderBottomColor: "var(--colors-prose-td-border)",
    },
    "& tbody tr:last-child": {
      borderBottomWidth: "0px",
    },
    "& tbody td": {
      verticalAlign: "baseline",
    },
    "& tfoot": {
      borderTopWidth: "1px",
      borderTopColor: "var(--colors-prose-th-border)",
    },
    "& tfoot td": {
      verticalAlign: "top",
    },
    "& th, & td": {
      textAlign: "start",
    },
    "& figcaption": {
      color: "var(--colors-prose-caption)",
    },
    "& > :first-child": {
      marginTop: "0px",
    },
    "& > :last-child": {
      marginBottom: "0px",
    },
  },
  defaultVariants: {
    size: "base",
  },
  variants: {
    size: {
      sm: {
        fontSize: "0.875rem",
        lineHeight: "1.7142857",
        "& p": {
          marginTop: "1.1428571em",
          marginBottom: "1.1428571em",
        },
        '& [class~="lead"]': {
          fontSize: "1.2857143em",
          lineHeight: "1.5555556",
          marginTop: "0.8888889em",
          marginBottom: "0.8888889em",
        },
        "& blockquote": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
          paddingInlineStart: "1.1111111em",
        },
        "& h1": {
          fontSize: "2.1428571em",
          marginTop: "0px",
          marginBottom: "0.8em",
          lineHeight: "1.2",
        },
        "& h2": {
          fontSize: "1.4285714em",
          marginTop: "1.6em",
          marginBottom: "0.8em",
          lineHeight: "1.4",
        },
        "& h3": {
          fontSize: "1.2857143em",
          marginTop: "1.5555556em",
          marginBottom: "0.4444444em",
          lineHeight: "1.5555556",
        },
        "& h4": {
          marginTop: "1.4285714em",
          marginBottom: "0.5714286em",
          lineHeight: "1.4285714",
        },
        "& img": {
          marginTop: "1.7142857em",
          marginBottom: "1.7142857em",
        },
        "& picture": {
          marginTop: "1.7142857em",
          marginBottom: "1.7142857em",
        },
        "& picture > img": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& video": {
          marginTop: "1.7142857em",
          marginBottom: "1.7142857em",
        },
        "& kbd": {
          fontSize: "0.8571429em",
          borderRadius: "0.3125rem",
          paddingTop: "0.1428571em",
          paddingInlineEnd: "0.3571429em",
          paddingBottom: "0.1428571em",
          paddingInlineStart: "0.3571429em",
        },
        "& code": {
          fontSize: "0.8571429em",
        },
        "& h2 code": {
          fontSize: "0.9em",
        },
        "& h3 code": {
          fontSize: "0.8888889em",
        },
        "& pre": {
          fontSize: "0.8571429em",
          lineHeight: "1.6666667",
          marginTop: "1.6666667em",
          marginBottom: "1.6666667em",
          borderRadius: "0.25rem",
          paddingTop: "0.6666667em",
          paddingInlineEnd: "1em",
          paddingBottom: "0.6666667em",
          paddingInlineStart: "1em",
        },
        "& ol": {
          marginTop: "1.1428571em",
          marginBottom: "1.1428571em",
          paddingInlineStart: "1.5714286em",
        },
        "& ul": {
          marginTop: "1.1428571em",
          marginBottom: "1.1428571em",
          paddingInlineStart: "1.5714286em",
        },
        "& li": {
          marginTop: "0.2857143em",
          marginBottom: "0.2857143em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4285714em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4285714em",
        },
        "& > ul > li p": {
          marginTop: "0.5714286em",
          marginBottom: "0.5714286em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.1428571em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.1428571em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.1428571em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.1428571em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginTop: "0.5714286em",
          marginBottom: "0.5714286em",
        },
        "& dl": {
          marginTop: "1.1428571em",
          marginBottom: "1.1428571em",
        },
        "& dt": {
          marginTop: "1.1428571em",
        },
        "& dd": {
          marginTop: "0.2857143em",
          paddingInlineStart: "1.5714286em",
        },
        "& hr": {
          marginTop: "2.8571429em",
          marginBottom: "2.8571429em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& table": {
          fontSize: "0.8571429em",
          lineHeight: "1.5",
        },
        "& thead th": {
          paddingInlineEnd: "1em",
          paddingBottom: "0.6666667em",
          paddingInlineStart: "1em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& tbody td, & tfoot td": {
          paddingTop: "0.6666667em",
          paddingInlineEnd: "1em",
          paddingBottom: "0.6666667em",
          paddingInlineStart: "1em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& figure": {
          marginTop: "1.7142857em",
          marginBottom: "1.7142857em",
        },
        "& figure > *": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& figcaption": {
          fontSize: "0.8571429em",
          lineHeight: "1.3333333",
          marginTop: "0.6666667em",
        },
      },
      base: {
        fontSize: "1rem",
        lineHeight: "1.75",
        "& p": {
          marginTop: "1.25em",
          marginBottom: "1.25em",
        },
        '& [class~="lead"]': {
          fontSize: "1.25em",
          lineHeight: "1.6",
          marginTop: "1.2em",
          marginBottom: "1.2em",
        },
        "& blockquote": {
          marginTop: "1.6em",
          marginBottom: "1.6em",
          paddingInlineStart: "1em",
        },
        "& h1": {
          fontSize: "2.25em",
          marginTop: "0px",
          marginBottom: "0.8888889em",
          lineHeight: "1.1111111",
        },
        "& h2": {
          fontSize: "1.5em",
          marginTop: "2em",
          marginBottom: "1em",
          lineHeight: "1.3333333",
        },
        "& h3": {
          fontSize: "1.25em",
          marginTop: "1.6em",
          marginBottom: "0.6em",
          lineHeight: "1.6",
        },
        "& h4": {
          marginTop: "1.5em",
          marginBottom: "0.5em",
          lineHeight: "1.5",
        },
        "& img": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& picture": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& picture > img": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& video": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& kbd": {
          fontSize: "0.875em",
          borderRadius: "0.3125rem",
          paddingTop: "0.1875em",
          paddingInlineEnd: "0.375em",
          paddingBottom: "0.1875em",
          paddingInlineStart: "0.375em",
        },
        "& code": {
          fontSize: "0.875em",
        },
        "& h2 code": {
          fontSize: "0.875em",
        },
        "& h3 code": {
          fontSize: "0.9em",
        },
        "& pre": {
          fontSize: "0.875em",
          lineHeight: "1.7142857",
          marginTop: "1.7142857em",
          marginBottom: "1.7142857em",
          borderRadius: "0.375rem",
          paddingTop: "0.8571429em",
          paddingInlineEnd: "1.1428571em",
          paddingBottom: "0.8571429em",
          paddingInlineStart: "1.1428571em",
        },
        "& ol": {
          marginTop: "1.25em",
          marginBottom: "1.25em",
          paddingInlineStart: "1.625em",
        },
        "& ul": {
          marginTop: "1.25em",
          marginBottom: "1.25em",
          paddingInlineStart: "1.625em",
        },
        "& li": {
          marginTop: "0.5em",
          marginBottom: "0.5em",
        },
        "& ol > li": {
          paddingInlineStart: "0.375em",
        },
        "& ul > li": {
          paddingInlineStart: "0.375em",
        },
        "& > ul > li p": {
          marginTop: "0.75em",
          marginBottom: "0.75em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.25em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.25em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.25em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.25em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginTop: "0.75em",
          marginBottom: "0.75em",
        },
        "& dl": {
          marginTop: "1.25em",
          marginBottom: "1.25em",
        },
        "& dt": {
          marginTop: "1.25em",
        },
        "& dd": {
          marginTop: "0.5em",
          paddingInlineStart: "1.625em",
        },
        "& hr": {
          marginTop: "3em",
          marginBottom: "3em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& table": {
          fontSize: "0.875em",
          lineHeight: "1.7142857",
        },
        "& thead th": {
          paddingInlineEnd: "0.5714286em",
          paddingBottom: "0.5714286em",
          paddingInlineStart: "0.5714286em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& tbody td, & tfoot td": {
          paddingTop: "0.5714286em",
          paddingInlineEnd: "0.5714286em",
          paddingBottom: "0.5714286em",
          paddingInlineStart: "0.5714286em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& figure": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& figure > *": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& figcaption": {
          fontSize: "0.875em",
          lineHeight: "1.4285714",
          marginTop: "0.8571429em",
        },
      },
      lg: {
        fontSize: "1.125rem",
        lineHeight: "1.7777778",
        "& p": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
        },
        '& [class~="lead"]': {
          fontSize: "1.2222222em",
          lineHeight: "1.4545455",
          marginTop: "1.0909091em",
          marginBottom: "1.0909091em",
        },
        "& blockquote": {
          marginTop: "1.6666667em",
          marginBottom: "1.6666667em",
          paddingInlineStart: "1em",
        },
        "& h1": {
          fontSize: "2.6666667em",
          marginTop: "0px",
          marginBottom: "0.8333333em",
          lineHeight: "1",
        },
        "& h2": {
          fontSize: "1.6666667em",
          marginTop: "1.8666667em",
          marginBottom: "1.0666667em",
          lineHeight: "1.3333333",
        },
        "& h3": {
          fontSize: "1.3333333em",
          marginTop: "1.6666667em",
          marginBottom: "0.6666667em",
          lineHeight: "1.5",
        },
        "& h4": {
          marginTop: "1.7777778em",
          marginBottom: "0.4444444em",
          lineHeight: "1.5555556",
        },
        "& img": {
          marginTop: "1.7777778em",
          marginBottom: "1.7777778em",
        },
        "& picture": {
          marginTop: "1.7777778em",
          marginBottom: "1.7777778em",
        },
        "& picture > img": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& video": {
          marginTop: "1.7777778em",
          marginBottom: "1.7777778em",
        },
        "& kbd": {
          fontSize: "0.8888889em",
          borderRadius: "0.3125rem",
          paddingTop: "0.2222222em",
          paddingInlineEnd: "0.4444444em",
          paddingBottom: "0.2222222em",
          paddingInlineStart: "0.4444444em",
        },
        "& code": {
          fontSize: "0.8888889em",
        },
        "& h2 code": {
          fontSize: "0.8666667em",
        },
        "& h3 code": {
          fontSize: "0.875em",
        },
        "& pre": {
          fontSize: "0.8888889em",
          lineHeight: "1.75",
          marginTop: "2em",
          marginBottom: "2em",
          borderRadius: "0.375rem",
          paddingTop: "1em",
          paddingInlineEnd: "1.5em",
          paddingBottom: "1em",
          paddingInlineStart: "1.5em",
        },
        "& ol": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
          paddingInlineStart: "1.5555556em",
        },
        "& ul": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
          paddingInlineStart: "1.5555556em",
        },
        "& li": {
          marginTop: "0.6666667em",
          marginBottom: "0.6666667em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4444444em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4444444em",
        },
        "& > ul > li p": {
          marginTop: "0.8888889em",
          marginBottom: "0.8888889em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginTop: "0.8888889em",
          marginBottom: "0.8888889em",
        },
        "& dl": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
        },
        "& dt": {
          marginTop: "1.3333333em",
        },
        "& dd": {
          marginTop: "0.6666667em",
          paddingInlineStart: "1.5555556em",
        },
        "& hr": {
          marginTop: "3.1111111em",
          marginBottom: "3.1111111em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& table": {
          fontSize: "0.8888889em",
          lineHeight: "1.5",
        },
        "& thead th": {
          paddingInlineEnd: "0.75em",
          paddingBottom: "0.75em",
          paddingInlineStart: "0.75em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& tbody td, & tfoot td": {
          paddingTop: "0.75em",
          paddingInlineEnd: "0.75em",
          paddingBottom: "0.75em",
          paddingInlineStart: "0.75em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& figure": {
          marginTop: "1.7777778em",
          marginBottom: "1.7777778em",
        },
        "& figure > *": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& figcaption": {
          fontSize: "0.8888889em",
          lineHeight: "1.5",
          marginTop: "1em",
        },
      },
      xl: {
        fontSize: "1.25rem",
        lineHeight: "1.8",
        "& p": {
          marginTop: "1.2em",
          marginBottom: "1.2em",
        },
        '& [class~="lead"]': {
          fontSize: "1.2em",
          lineHeight: "1.5",
          marginTop: "1em",
          marginBottom: "1em",
        },
        "& blockquote": {
          marginTop: "1.6em",
          marginBottom: "1.6em",
          paddingInlineStart: "1.0666667em",
        },
        "& h1": {
          fontSize: "2.8em",
          marginTop: "0px",
          marginBottom: "0.8571429em",
          lineHeight: "1",
        },
        "& h2": {
          fontSize: "1.8em",
          marginTop: "1.5555556em",
          marginBottom: "0.8888889em",
          lineHeight: "1.1111111",
        },
        "& h3": {
          fontSize: "1.5em",
          marginTop: "1.6em",
          marginBottom: "0.6666667em",
          lineHeight: "1.3333333",
        },
        "& h4": {
          marginTop: "1.8em",
          marginBottom: "0.6em",
          lineHeight: "1.6",
        },
        "& img": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& picture": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& picture > img": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& video": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& kbd": {
          fontSize: "0.9em",
          borderRadius: "0.3125rem",
          paddingTop: "0.25em",
          paddingInlineEnd: "0.4em",
          paddingBottom: "0.25em",
          paddingInlineStart: "0.4em",
        },
        "& code": {
          fontSize: "0.9em",
        },
        "& h2 code": {
          fontSize: "0.8611111em",
        },
        "& h3 code": {
          fontSize: "0.9em",
        },
        "& pre": {
          fontSize: "0.9em",
          lineHeight: "1.7777778",
          marginTop: "2em",
          marginBottom: "2em",
          borderRadius: "0.5rem",
          paddingTop: "1.1111111em",
          paddingInlineEnd: "1.3333333em",
          paddingBottom: "1.1111111em",
          paddingInlineStart: "1.3333333em",
        },
        "& ol": {
          marginTop: "1.2em",
          marginBottom: "1.2em",
          paddingInlineStart: "1.6em",
        },
        "& ul": {
          marginTop: "1.2em",
          marginBottom: "1.2em",
          paddingInlineStart: "1.6em",
        },
        "& li": {
          marginTop: "0.6em",
          marginBottom: "0.6em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4em",
        },
        "& > ul > li p": {
          marginTop: "0.8em",
          marginBottom: "0.8em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.2em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.2em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.2em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.2em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginTop: "0.8em",
          marginBottom: "0.8em",
        },
        "& dl": {
          marginTop: "1.2em",
          marginBottom: "1.2em",
        },
        "& dt": {
          marginTop: "1.2em",
        },
        "& dd": {
          marginTop: "0.6em",
          paddingInlineStart: "1.6em",
        },
        "& hr": {
          marginTop: "2.8em",
          marginBottom: "2.8em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& table": {
          fontSize: "0.9em",
          lineHeight: "1.5555556",
        },
        "& thead th": {
          paddingInlineEnd: "0.6666667em",
          paddingBottom: "0.8888889em",
          paddingInlineStart: "0.6666667em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& tbody td, & tfoot td": {
          paddingTop: "0.8888889em",
          paddingInlineEnd: "0.6666667em",
          paddingBottom: "0.8888889em",
          paddingInlineStart: "0.6666667em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& figure": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& figure > *": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& figcaption": {
          fontSize: "0.9em",
          lineHeight: "1.5555556",
          marginTop: "1em",
        },
      },
      "2xl": {
        fontSize: "1.5rem",
        lineHeight: "1.6666667",
        "& p": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
        },
        '& [class~="lead"]': {
          fontSize: "1.25em",
          lineHeight: "1.4666667",
          marginTop: "1.0666667em",
          marginBottom: "1.0666667em",
        },
        "& blockquote": {
          marginTop: "1.7777778em",
          marginBottom: "1.7777778em",
          paddingInlineStart: "1.1111111em",
        },
        "& h1": {
          fontSize: "2.6666667em",
          marginTop: "0px",
          marginBottom: "0.875em",
          lineHeight: "1",
        },
        "& h2": {
          fontSize: "2em",
          marginTop: "1.5em",
          marginBottom: "0.8333333em",
          lineHeight: "1.0833333",
        },
        "& h3": {
          fontSize: "1.5em",
          marginTop: "1.5555556em",
          marginBottom: "0.6666667em",
          lineHeight: "1.2222222",
        },
        "& h4": {
          marginTop: "1.6666667em",
          marginBottom: "0.6666667em",
          lineHeight: "1.5",
        },
        "& img": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& picture": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& picture > img": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& video": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& kbd": {
          fontSize: "0.8333333em",
          borderRadius: "0.375rem",
          paddingTop: "0.25em",
          paddingInlineEnd: "0.3333333em",
          paddingBottom: "0.25em",
          paddingInlineStart: "0.3333333em",
        },
        "& code": {
          fontSize: "0.8333333em",
        },
        "& h2 code": {
          fontSize: "0.875em",
        },
        "& h3 code": {
          fontSize: "0.8888889em",
        },
        "& pre": {
          fontSize: "0.8333333em",
          lineHeight: "1.8",
          marginTop: "2em",
          marginBottom: "2em",
          borderRadius: "0.5rem",
          paddingTop: "1.2em",
          paddingInlineEnd: "1.6em",
          paddingBottom: "1.2em",
          paddingInlineStart: "1.6em",
        },
        "& ol": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
          paddingInlineStart: "1.5833333em",
        },
        "& ul": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
          paddingInlineStart: "1.5833333em",
        },
        "& li": {
          marginTop: "0.5em",
          marginBottom: "0.5em",
        },
        "& ol > li": {
          paddingInlineStart: "0.4166667em",
        },
        "& ul > li": {
          paddingInlineStart: "0.4166667em",
        },
        "& > ul > li p": {
          marginTop: "0.8333333em",
          marginBottom: "0.8333333em",
        },
        "& > ul > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ul > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& > ol > li > p:first-child": {
          marginTop: "1.3333333em",
        },
        "& > ol > li > p:last-child": {
          marginBottom: "1.3333333em",
        },
        "& ul ul, & ul ol, & ol ul, & ol ol": {
          marginTop: "0.6666667em",
          marginBottom: "0.6666667em",
        },
        "& dl": {
          marginTop: "1.3333333em",
          marginBottom: "1.3333333em",
        },
        "& dt": {
          marginTop: "1.3333333em",
        },
        "& dd": {
          marginTop: "0.5em",
          paddingInlineStart: "1.5833333em",
        },
        "& hr": {
          marginTop: "3em",
          marginBottom: "3em",
        },
        "& hr + *": {
          marginTop: "0px",
        },
        "& h2 + *": {
          marginTop: "0px",
        },
        "& h3 + *": {
          marginTop: "0px",
        },
        "& h4 + *": {
          marginTop: "0px",
        },
        "& table": {
          fontSize: "0.8333333em",
          lineHeight: "1.4",
        },
        "& thead th": {
          paddingInlineEnd: "0.6em",
          paddingBottom: "0.8em",
          paddingInlineStart: "0.6em",
        },
        "& thead th:first-child": {
          paddingInlineStart: "0px",
        },
        "& thead th:last-child": {
          paddingInlineEnd: "0px",
        },
        "& tbody td, & tfoot td": {
          paddingTop: "0.8em",
          paddingInlineEnd: "0.6em",
          paddingBottom: "0.8em",
          paddingInlineStart: "0.6em",
        },
        "& tbody td:first-child, & tfoot td:first-child": {
          paddingInlineStart: "0px",
        },
        "& tbody td:last-child, & tfoot td:last-child": {
          paddingInlineEnd: "0px",
        },
        "& figure": {
          marginTop: "2em",
          marginBottom: "2em",
        },
        "& figure > *": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& figcaption": {
          fontSize: "0.8333333em",
          lineHeight: "1.6",
          marginTop: "1em",
        },
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
      heading: {
        value: "{colors.slate.900}",
      },
      lead: {
        value: "{colors.slate.600}",
      },
      link: {
        value: "{colors.slate.900}",
      },
      bold: {
        value: "{colors.slate.900}",
      },
      counter: {
        value: "{colors.slate.500}",
      },
      bullet: {
        value: "{colors.slate.300}",
      },
      hrBorder: {
        value: "{colors.slate.200}",
      },
      quote: {
        value: "{colors.slate.900}",
      },
      quoteBorder: {
        value: "{colors.slate.200}",
      },
      caption: {
        value: "{colors.slate.500}",
      },
      kbd: {
        value: "{colors.slate.900}",
      },
      kbdShadow: {
        value: "0 0 0",
      },
      code: {
        value: "{colors.slate.900}",
      },
      preCode: {
        value: "{colors.slate.200}",
      },
      preBg: {
        value: "{colors.slate.800}",
      },
      thBorder: {
        value: "{colors.slate.300}",
      },
      tdBorder: {
        value: "{colors.slate.200}",
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
