import { Guitars } from '../../types/guitar.type';
import { State } from '../../types/state.type';
import { ReducerName } from '../../utils/constant';

export const getGuitarsData = (state:State):Guitars => state[ReducerName.Guitars].guitars;
export const getGuitarsStatus = (state:State):boolean => state[ReducerName.Guitars].isGuitarsLoading;
