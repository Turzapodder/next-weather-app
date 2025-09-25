import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UnitSystem = 'metric' | 'imperial';

interface UnitsState {
  system: UnitSystem;
}

const initialState: UnitsState = {
  system: 'imperial',
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setUnitSystem: (state, action: PayloadAction<UnitSystem>) => {
      state.system = action.payload;
    },
  },
});

export const { setUnitSystem } = unitsSlice.actions;
export default unitsSlice.reducer;