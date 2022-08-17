import { Client, Request } from '@pepperi-addons/debug-server';
import MyService from './my.service';
import { Relation } from '@pepperi-addons/papi-sdk';
import jwtDecode from "jwt-decode";

export const bundleFileName = 'legacy_var';

export async function install(client: Client, req: Request){
    const token = jwtDecode(client.OAuthAccessToken) as any;
    const distUUID = token['pepperi.distributoruuid'];

    // protection from installing on distributors by mistake.
    // there is also another protection that the dictionray resources iframesDic not loaded for userRole!="VARAdmin"
    if (distUUID!='be266ef2-9759-4a7b-b75a-6e2422815674' && distUUID!='063be5e2-d21f-4517-90a4-8c856847d88b' && distUUID!='8141752a-a033-4f4b-8b06-1ea4923f1464') {
        return {
            success:false,
            errorMessage: 'This addon cant be installed on this distributor'}
    } else {
        const resObject = await upsertSettingsRelation(client);
        return resObject;
    }
}

export async function uninstall(client: Client, request: Request){
    return {success:true};
}

export async function upgrade(client: Client, req: Request){
    let resObject = await upsertSettingsRelation(client);
    return resObject;
}

export async function downgrade(client: Client, request: Request){
    return {success:true}
}

async function addRelations(client: Client, relations: Relation[]){
    const service = new MyService(client);
    const promises: Promise<any>[] = [];
    relations.forEach(relation => {
        promises.push(service.createRelation(relation));
    });
    const result = await Promise.all(promises);
    return result;
}

function getSettingsRelation(client: Client, groupName: string, slugName: string, queryParams: string, name: string, desc: string): Relation {
    return {
        RelationName: "SettingsBlock",
        GroupName: groupName,
        SlugName: slugName,
        QueryParams: queryParams,
        Name: name,
        Description: desc,
        Type: "NgComponent",
        SubType: "NG14",
        AddonUUID: client.AddonUUID,
        AddonRelativeURL: bundleFileName,
        ComponentName: `AddonComponent`,
        ModuleName: `AddonModule`,
        ElementsModule: 'WebComponents',
        ElementName: `settings-element-${client.AddonUUID}`,
    }
}

async function upsertSettingsRelation(client: Client) {
    try {
    
        let settingsRelations: Relation[] = [];
    
        // Var
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_distributors', 'view=var_distributors&uri=grid/vardistributors', 'VarDistributors', 'Var Distributors'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_pepperi_system', 'view=var_pepperi_system', 'PepperiSystem', 'Pepperi System'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_pepperi_operation', 'view=var_pepperi_operation', 'PepperiOperation', 'Pepperi Operation'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_atd_templates', 'view=var_atd_templates', 'ATDTemplates', 'ATD Templates'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_ui_control_field_bank', 'view=var_ui_control_field_bank', 'UIControlFieldBank', 'UI Control Field Bank'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_ui_control_properties', 'view=var_ui_control_properties', 'UIControlProperties', 'UI Control Properties'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_features_visibility', 'view=var_features_visibility', 'UIFeaturesVisibility', 'UI Features Visibility'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_manage_campaigns', 'view=var_manage_campaigns', 'UIManageCampaigns', 'UI Manage Campaigns'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_old_workflow_migration', 'view=var_old_workflow_migration', 'OldWorkflowMigration', 'Old Workflow Migration'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_purge_tables_data', 'view=var_purge_tables_data', 'PurgeTablesData', 'Purge Tables Data'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_generic_list_migration', 'view=var_generic_list_migrationPage', 'GenericListMigration', 'Generic List Migration'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_manage_addons', 'view=var_manage_addons&uri=grid/addonmanager', 'ManageAddons', 'Manage Addons'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_configurations_details', 'view=var_configurations_details', 'ConfigurationDetails', 'Configuration Details'));
        settingsRelations.push(getSettingsRelation(client, 'Var', 'var_create_new_distributor', 'view=var_create_new_distributor', 'CreateNewDistributor', 'Create New Distributor'));
        
        await addRelations(client, settingsRelations);

        return { success: true };
    } catch(e){
        return { success: false };
    }
}


