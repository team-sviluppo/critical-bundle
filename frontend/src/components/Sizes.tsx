import { useEffect, useState, useContext, useRef } from 'react';
import { createStyles, Switch, Group, rem, Flex } from '@mantine/core';
import CriticalBundleContext from 'context';
import { IScreenInterface } from 'interfaces';

const useStyles = createStyles((theme) => ({
    container: {
        top: 200,
        position: 'relative'
    },

    body: {
        display: 'flex',
        alignItems: 'center'
    },

    track: {
        width: rem(40),
        height: rem(6),
        overflow: 'visible',
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

const screenSizes: IScreenInterface[] = [
    {width: 320, height: 640},
    {width: 320, height: 750},
    {width: 767, height: 640},
    {width: 767, height: 850},
    {width: 991, height: 640},
    {width: 1199, height: 900},
    {width: 1199, height: 1200},
    {width: 1920, height: 1080},
    {width: 1920, height: 1440},
    {width: 2560, height: 2300},
];

export function Sizes() {
    const { classes } = useStyles();
    const { setScreen } = useContext(CriticalBundleContext);
    const listScreen = useRef<IScreenInterface[]>([]);
    const [value, setValue] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!value) return;
        if (value.length == 0) {
            setError('Devi selezionare almeno una dimensione dello schermo');
            setScreen!(null); 
        }
        else
            {
                setError('');
                listScreen.current = value.map(v => screenSizes[parseInt(v)]);
                setScreen!(listScreen.current); 
            }
    }, [value])

    return (
        <div className={classes.container}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ sm: 'center' }}
                >
                <Switch.Group
                    defaultValue={["0","1","2","3","4","5","6","7","8","9"]}
                    value={value} 
                    onChange={setValue}
                    error={error}
                    label="Seleziona le dimensioni dello schermo"
                    description="Le dimensioni sono espresse in Larghezza x Lunghezza in pixel"
                    withAsterisk
                    required
                >
                    <Group mt="xs">
                        <Switch value="0" label="320 x 640" />
                        <Switch value="1" label="320 x 750" />
                        <Switch value="2" label="767 x 640" />
                        <Switch value="3" label="767 x 850" />
                        <Switch value="4" label="991 x 640" />
                        <Switch value="5" label="1199 x 900" />
                        <Switch value="6" label="1199 x 1200" />
                        <Switch value="7" label="1920 x 1080" />
                        <Switch value="8" label="1920 x 1440" />
                        <Switch value="9" label="2560 x 2300" />
                    </Group>
                </Switch.Group>
            </Flex>
        </div>
    );
}