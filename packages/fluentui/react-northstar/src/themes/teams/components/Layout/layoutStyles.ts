import { debugRoot, debugArea, debugGap } from '../../../../styles/debugStyles';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { LayoutStylesProps } from '../../../../components/Layout/Layout';

const countTrue = items => items.filter(Boolean).length;

const layoutStyles: ComponentSlotStylesPrepared<LayoutStylesProps> = {
  root: ({ props }): ICSSInJSStyle => {
    const {
      alignItems,
      debug,
      gap,
      justifyItems,
      hasMain,
      mainSize,
      hasEnd,
      endSize,
      hasStart,
      startSize,
      vertical,
    } = props;

    return {
      ...(debug && debugRoot()),
      justifyItems,
      alignItems,
      display: ['grid', '-ms-grid'],
      [vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: [
        // Heads up!
        // IE11 Doesn't support grid-gap, insert virtual columns instead
        hasStart && startSize,
        gap && hasStart && hasMain && gap,
        hasMain && mainSize,
        gap && (hasStart || hasMain) && hasEnd && gap,
        hasEnd && endSize,
      ]
        .filter(Boolean)
        .join(' '),
      ...(vertical && {
        gridAutoFlow: 'row',
        '-ms-grid-columns': '1fr',
      }),
    };
  },

  gap: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
  }),

  start: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: '1',
  }),

  main: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: ['grid', '-ms-grid'],
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: countTrue([p.hasStart, p.hasStart && p.gap, p.hasMain]),
  }),

  end: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: countTrue([p.hasStart, p.hasStart && p.gap, p.hasMain && p.gap]),
  }),
};

export default layoutStyles;
