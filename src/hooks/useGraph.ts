import {useQuery} from "@tanstack/react-query";
import { getGraph } from "@/api/mockApi";
import { useAppStore } from "@/store/appStore";

export const useGraph = () =>{
    const selectedAppId = useAppStore(
        (state) => state.selectAppId
    );
    return useQuery({
        queryKey:["graph", selectedAppId],
        queryFn:()=> getGraph(selectedAppId!),
        enabled: !!selectedAppId,
    });
};