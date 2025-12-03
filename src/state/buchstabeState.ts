import {atomWithStorage} from 'jotai/utils';

type Buchstaben = {
    value: string;
}

export const buchstabeState = atomWithStorage('buchstabeState', <Buchstaben[]>([]));
