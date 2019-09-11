export default class Utils {
    static removeAlert(alertDivId: string, compRef: any) {
        $("#" + alertDivId).fadeTo(500, 0).slideUp(500, function () {
            compRef.errMsg = null;
            compRef.successMsg = null;

        });
    }
}