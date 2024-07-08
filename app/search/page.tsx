import getsongsByTitle from "@/actions/getSongsbyTitle"
import Header from "@/components/Header";
import SearchInput from "@/components/Searchinput";
import Searchcontent from "./components/searchcontent";

interface Searchprops{
    searchParams:{
        title:string
    }
}
export const revalidate =0;

const Search = async({searchParams}:Searchprops)=>{
    const songs = await getsongsByTitle(searchParams.title);

    return(
        <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
          <Header classname="from-bg-neutral-900">
            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">Search</h1>
                <SearchInput/>
            </div>
          </Header>
          <Searchcontent songs={songs}/>
        </div>
    )

}
export default Search;