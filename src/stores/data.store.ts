import { create } from 'zustand'
import {z} from "zod"
import { devtools, persist } from 'zustand/middleware'

const DataStoreSchema = z.object({
  pathDistance: z.number().min(0).nonnegative(),
  updatePathDistance: z.function().args(z.number().min(0).nonnegative()).returns(z.void())
});

const useDataStore = create<z.infer<typeof DataStoreSchema>>()(
  devtools(
    persist(
      (set) => ({
        // optimal path distance in tiles
        pathDistance: 0,
        // function to update path distance
        updatePathDistance: (distance: number) => set((state) => ({
          pathDistance: state.pathDistance + distance
        }))
      }),
      {
        name: 'DataStore',
      }
    )
  )
)

export default useDataStore;