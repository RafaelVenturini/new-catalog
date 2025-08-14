"use client"
import {Box} from "@mui/material";
import {ListRow} from "@components/client-list/list-row";
import {ListHeader, WarnOutOfStock} from "@components/client-list/list-header";
import {ListFooter} from "@components/client-list/list-footer";
import {useList} from "@components/listContext";

interface Props {
    handleCloseAction: () => void
}

export function OpenList({handleCloseAction}: Props) {
    const {getListData} = useList()
    const listData = getListData()
    const {getOutOfStock} = useList()

    const out = getOutOfStock()

    return (
        <Box
            sx={{
                height: 'calc(85vh - 80px)',
                width: '90vw',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                transition: 'opacity .2s ease-out',
                backDropFilter: 'blur(8px)',
                transform: 'translateY(0)',
                opacity: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{height:"63vh"}}>
                <ListHeader handleCloseAction={handleCloseAction}/>
                <Box className={'wrapper-saved-product-list'}>
                    {out > 0 ? <WarnOutOfStock out={out}/> : null}
                    <Box component="ul">
                        {listData.list.map(item => (
                            <ListRow
                                key={item.sku}
                                lista={item}
                            />
                        ))}
                    </Box>
                </Box>
                <ListFooter qntd={listData.qntdTotal} total={listData.valorTotal}/>
            </Box>
        </Box>

    )
}