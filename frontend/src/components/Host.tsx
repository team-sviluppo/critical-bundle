import { useEffect, useState, useContext, useRef } from 'react';
import { TextInput, createStyles, rem } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import CriticalBundleContext from 'context';
import { useValidHost, useStringEmpty } from 'hooks';

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
    top: 140
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating ? theme.colorScheme === 'dark' ? theme.white : theme.black
                    : theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },

  invalid: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}));

export function Host() {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });
    const { setHost } = useContext(CriticalBundleContext);
    const [isValid, setIsValid] = useValidHost();
    const [isHost, setIsHost] = useStringEmpty();
    const host = useRef<string>('')

    useEffect(() => {
        if (!setHost) return;
        if (!isValid) {
            setError('L\'indirizzo web non è valido.');
            setHost(null);
        }
        else 
            setError('');
    }, [isValid]);

    useEffect(() => {
        if (!isHost) {
            setError('L\'indirizzo web non può essere vuoto');
            setHost!(null);
        }
        else
            setError('');
    }, [isHost])

    useEffect(() => {
        if (!value || !setHost) return;
        host.current = value;
        /** check if value is not empty */
        setIsHost(value);
        /** check if value is valid host */
        setIsValid(value);
        setHost(value);
    }, [value])

    return (
        <TextInput
            label="Host address name"
            placeholder="Inserisci l'indirizzo web, Es.: http://www.hextra.it"
            required
            classNames={classes}
            value={value}
            error={error}
            onChange={(event) => setValue(event.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"
            autoComplete="nope"
            rightSection={error != '' ? <IconAlertTriangle stroke={1.5} size="1.1rem" className={classes.icon} /> : null}
        />
    );
}