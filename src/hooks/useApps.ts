import {useQuery} from "@tanstack/react-query";
import {getApps} from "@/api/mockApi";

export const useApps = () =>{
    return useQuery({
        queryKey:["apps"],
        queryFn: getApps,
    });
};