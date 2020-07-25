

Access : 

1- `INSERT INTO `access_list` (`id`, `name`, `endpoint`, `method_id`, `flag_id`) VALUES (NULL, NULL, '/v1/chart_aria_deposit_funds', '1', '1');`
2- `INSERT INTO `page_actions` (`id`, `menu_item_id`, `permitted_action_id`, `access_id`) VALUES (NULL, 'MENU_ITEM_ID', '1', 'ACCESS_ID');`
3- `INSERT INTO `role_page_actions` (`id`, `role_id`, `page_action_id`) VALUES (NULL, '1', 'PAGE_ACTION_ID');`