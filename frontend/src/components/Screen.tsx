import { useState, useRef, useContext, useEffect } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, rem, Badge } from '@mantine/core';
import CriticalBundleContext from 'context';
import { IScreenInterface, IScreenTableInterface } from 'interfaces';

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
        theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
            : theme.colors[theme.primaryColor][0],
    },

    header: {
        width: rem(40)
    },

    container: {
        top: 150,
        position: 'relative'
    },

    track: {
        width: rem(40),
        height: rem(6),
        overflow: 'visible',
    },

    error: {
        padding: 5
    },

    thumb: {
        width: rem(20),
        height: rem(20),
        left: rem(-2),
        transition: 'background-color 100ms ease, left 100ms ease',

        'input:checked + * > &': {
        backgroundColor: theme.fn.primaryColor(),
        },
    },
}));

const screenSizes: IScreenTableInterface[] = [
    { id: '320x640', row: {width: 320, height: 640 }},
    { id: '320x750', row: {width: 320, height: 750 }},
    { id: '767x640', row: {width: 767, height: 640 }},
    { id: '767x850', row: {width: 767, height: 850 }},
    { id: '991x640', row: {width: 991, height: 640 }},
    { id: '1199x900', row: {width: 1199, height: 900 }},
    { id: '1199x1200', row: {width: 1199, height: 1200 }},
    { id: '1920x1080', row: {width: 1920, height: 1080 }},
    { id: '1920x640', row: {width: 1920, height: 1440 }},
    { id: '2560x2300', row: {width: 2560, height: 2300 }},
];

export function Screen() {
    const { classes, cx } = useStyles();
    const [error, setError] = useState<string>('');
    const [selection, setSelection] = useState<string[]>(['320x640', 
                                                        '320x750', 
                                                        '767x640', 
                                                        '767x850', 
                                                        '991x640', 
                                                        '1199x900',
                                                        '1199x1200',
                                                        '1920x1080',
                                                        '1920x640',
                                                        '2560x2300']);
    const listScreen = useRef<IScreenInterface[]>([]);
    const { setScreen } = useContext(CriticalBundleContext);

    const toggleRow = (id: string) => setSelection((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    const toggleAll = () => setSelection((current) => (current.length === screenSizes.length ? [] : screenSizes.map((item: IScreenTableInterface) => item.id)));

    const rows = screenSizes.map((item: IScreenTableInterface) => {
        const selected = selection.includes(item.id);
        return (
        <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
            <td>
            <Checkbox
                checked={selection.includes(item.id)}
                onChange={() => toggleRow(item.id)}
                transitionDuration={0}
            />
            </td>
            <td>{item.row.width}</td>
            <td>{item.row.height}</td>
        </tr>
        );
    });

    useEffect(() => {
        if (!selection) return;
        if (selection.length == 0) {
            setError('Devi selezionare almeno una dimensione dello schermo');
            setScreen!(null); 
        } else {
            setError('');
            listScreen.current = selection.map((item: string) => {
                const c: IScreenTableInterface | undefined = screenSizes.find((c: IScreenTableInterface) => c.id == item)
                return c!.row;
            });
            setScreen!(listScreen.current); 
        }
    }, [selection])

    return (
        <div className={classes.container}>
            <ScrollArea>
                <Table miw={600} verticalSpacing="xs" 
                      fontSize="xs" captionSide="top"
                       striped highlightOnHover withBorder withColumnBorders>
                    <caption>Seleziona la risoluzione</caption>
                    <thead>
                    <tr>
                        <th className={classes.header}>
                            <Checkbox
                                onChange={toggleAll}
                                checked={selection.length === screenSizes.length}
                                indeterminate={selection.length > 0 && selection.length !== screenSizes.length}
                                transitionDuration={0}
                            />
                        </th>
                        <th>Width</th>
                        <th>Height</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            { error != '' ? <div className={classes.error}><Badge color="red" size="lg" variant="filled">{error}</Badge></div> : null }
        </div>
    );
}